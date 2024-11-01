const { execSync } = require('child_process');
const semver = require('semver');
const axios = require('axios');

const repoUrl = 'https://github.com/ColdPBC/cold-monorepo.git';
const repoApiUrl = 'https://api.github.com/repos/ColdPBC/cold-monorepo';
const githubToken = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

if (!githubToken) {
	console.error('GitHub token is not defined. Please set the GITHUB_TOKEN or GH_TOKEN environment variable.');
	process.exit(1);
}

function getTags() {
	const tags = execSync('git ls-remote --tags ' + repoUrl)
		.toString()
		.split('\n')
		.map(line => line.split('\t')[1])
		.filter(tag => tag)
		.map(tag => tag.replace('refs/tags/', ''));
	return tags;
}

async function getReleases() {
	try {
		const releases = [];
		let page = 1;
		let response;
		do {
			response = await axios.get(`${repoApiUrl}/releases`, {
				params: { page, per_page: 100 },
				headers: { Authorization: `token ${githubToken}` },
			});
			console.log(`Fetched page ${page}:`, response.data);
			releases.push(...response.data.map(release => release.tag_name));
			page++;
		} while (response.data.length > 0);
		return releases;
	} catch (error) {
		if (error.response && error.response.status === 404) {
			console.error('Releases not found.');
			return [];
		} else {
			console.error('Error fetching releases:', error.message);
			throw error;
		}
	}
}

async function getAllReleases() {
	try {
		const releases = [];
		let page = 1;
		let response;
		do {
			response = await axios.get(`${repoApiUrl}/releases`, {
				params: { page, per_page: 100 },
				headers: { Authorization: `token ${githubToken}` },
			});
			releases.push(...response.data);
			page++;
		} while (response.data.length > 0);
		return releases;
	} catch (error) {
		console.error('Error fetching all releases:', error.message);
		throw error;
	}
}

function deleteTag(tag) {
	try {
		execSync(`git tag -d ${tag}`);
		execSync(`git push origin :refs/tags/${tag}`);
	} catch (error) {
		console.error(`Failed to delete tag: ${tag}`, error.message);
	}
}

async function deleteRelease(tag) {
	try {
		const response = await axios.get(`${repoApiUrl}/releases/tags/${tag}`, {
			headers: { Authorization: `token ${githubToken}` },
		});
		const releaseId = response.data.id;
		await axios.delete(`${repoApiUrl}/releases/${releaseId}`, {
			headers: { Authorization: `token ${githubToken}` },
		});
		console.log(`Deleted release: ${tag}`);
	} catch (error) {
		if (error.response && error.response.status === 404) {
			console.log(`Release not found for tag: ${tag}. Trying to find by name.`);
			const allReleases = await getAllReleases();
			const release = allReleases.find(release => release.tag_name === tag || release.name === tag);
			if (release) {
				await axios.delete(`${repoApiUrl}/releases/${release.id}`, {
					headers: { Authorization: `token ${githubToken}` },
				});
				console.log(`Deleted release by name: ${tag}`);
			} else {
				console.error(`Release not found for tag or name: ${tag}`);
			}
		} else {
			console.error(`Failed to delete release: ${tag}`, error.message);
		}
	}
}

async function main() {
	const [endVersion] = process.argv.slice(2);

	if (!semver.valid(endVersion)) {
		console.error('Invalid semver value provided.');
		process.exit(1);
	}

	const tags = getTags();

	const tagsToDelete = tags.filter(tag => {
		const cleanedTag = semver.clean(tag);
		return semver.valid(cleanedTag) && semver.lte(cleanedTag, endVersion);
	});

	const releases = await getReleases();
	const releasesToDelete = releases.filter(release => {
		const cleanedRelease = semver.clean(release);
		return semver.valid(cleanedRelease) && semver.lte(cleanedRelease, endVersion);
	});

	for (const tag of tagsToDelete) {
		console.log(`Deleting tag: ${tag}`);
		deleteTag(tag);
	}

	for (const release of releasesToDelete) {
		console.log(`Deleting release: ${release}`);
		await deleteRelease(release);
	}
}

main();
