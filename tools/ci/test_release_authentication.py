"""Guard the release boundary without publishing or contacting GitHub."""
from pathlib import Path
import shlex
import unittest

import yaml

ROOT = Path(__file__).resolve().parents[2]


def release_configuration():
    paths = [path for name in ['.releaserc', '.releaserc.yml']
             if (path := ROOT / name).exists()]
    if len(paths) != 1:
        raise AssertionError('Keep exactly one active semantic-release configuration')
    return yaml.safe_load(paths[0].read_text())


def release_step():
    workflow = yaml.load((ROOT / '.github/workflows/release.yml').read_text(), Loader=yaml.BaseLoader)
    steps = [step for step in workflow['jobs']['release']['steps']
             if 'semantic-release' in step.get('run', '')]
    if len(steps) != 1:
        raise AssertionError('Keep a single semantic-release invocation')
    return steps[0]


class ReleaseAuthenticationTests(unittest.TestCase):
    def test_release_uses_only_the_ephemeral_github_token(self):
        """A missing custom PAT must not prevent GitHub authentication."""
        self.assertEqual(release_step()['env'], {'GITHUB_TOKEN': '${{ secrets.GITHUB_TOKEN }}'})

    def test_release_publishes_without_repository_file_writes(self):
        """Do not reactivate plugins that prepare package/changelog commits."""
        config = release_configuration()
        self.assertEqual(config['branches'], [{'name': 'main', 'prerelease': False}])
        self.assertEqual(config['plugins'], [
            '@semantic-release/commit-analyzer',
            '@semantic-release/release-notes-generator',
            '@semantic-release/github',
        ])

    def test_release_installs_the_active_plugins_explicitly(self):
        """All configured plugins must be available to the isolated npx runner."""
        command = shlex.split(release_step()['run'])
        self.assertEqual(command[0], 'npx')
        self.assertEqual(command[-1], 'semantic-release')
        packages = [command[index + 1] for index, value in enumerate(command[:-1]) if value == '-p']
        self.assertEqual(set(packages), {
            'semantic-release', '@semantic-release/commit-analyzer',
            '@semantic-release/release-notes-generator', '@semantic-release/github',
        })


if __name__ == '__main__':
    unittest.main()
