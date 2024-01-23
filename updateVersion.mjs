import * as fs from 'fs';
import path from "node:path";
import {execSync} from "node:child_process";

const files = () => ['flightcontrol.json', 'flightcontrol_platform.json'];

const updateFiles = (version) => {
    files().forEach((file) => {
        updateVersion(file, version);
    });
}

function getFromLatestCommit(basePath) {
  try {
    // Use git to get the latest commit hash
    const latestCommitHash = execSync('git rev-parse HEAD', { cwd: basePath }).toString().trim();

    // Use git to get a list of files modified in the latest commit
    const modifiedFiles = execSync(`git diff --name-only ${latestCommitHash}`, { cwd: basePath }).toString().split('\n');

    // Extract unique directories from modified files
    const modifiedDirectories = new Set();
    modifiedFiles.forEach((file) => {
      console.log(`${file} was modified in commit ${latestCommitHash} (${basePath})`);

      const directory = path.dirname(file);
      console.log(`directory: ${directory}`);
      // Check if the directory is within 'apps' or 'libs'
      if ((directory.startsWith('apps') && directory.includes('src')) || (directory.startsWith('libs') && directory.includes('src'))) {
        const parts = directory.split('/');
        const dir = path.join(parts[0], parts[1]);
        console.log(`ADDING ${dir} to modified directories`);

        modifiedDirectories.add(dir);
      }
    });

    return Array.from(modifiedDirectories);
  } catch (error) {
    console.error('Error getting directories modified in the latest commit:', error.message);
    return [];
  }
}

function updateVersions(updatedDirs, version) {
  if (updatedDirs.length > 0) {
    updatedDirs.forEach((dir) => {
      const file = `./${dir}/package.json`;

      if (fs.existsSync(file)) {
        console.log(`updating version in ${file} to ${version}`);
        fs.readFile(file, 'utf8', (err, data) => {
          if (err) {
            return console.log(err);
          }

          const pkg = JSON.parse(data);
          pkg.version = version;

          fs.writeFile(file, JSON.stringify(pkg, null, 2), 'utf8', (err) => {
            if (err) {
              return console.log(err);
            }
          });
        });
      }
    });
  }
}

const updateVersion = () => {
  const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
  updateVersions(getFromLatestCommit('./apps') , pkg.version);

  updateVersions(getFromLatestCommit('./libs'), pkg.version);
};

updateFiles(process.argv[2]);

