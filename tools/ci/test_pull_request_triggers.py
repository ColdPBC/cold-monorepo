"""Keep one validation run per PR update without losing integration-branch checks."""
from pathlib import Path
import unittest

import yaml

WORKFLOWS = Path(__file__).resolve().parents[2] / '.github' / 'workflows'
VALIDATION_WORKFLOWS = {
    'api-unit-tests.yml': ('api-unit-tests', ['main', 'staging']),
    'rabbitmq-unit-tests.yml': ('RabbitMQ regression tests', ['main', 'staging']),
    'shared-library-unit-tests.yml': ('Full shared-library suite', ['main', 'staging']),
    'lockfile-integrity.yml': ('validate-lockfile', ['main', 'staging']),
    'deployment-safety.yml': ('No Flightcontrol deployments', ['main']),
}
SHARED_LIBRARY_PATHS = [
    'libs/nest/**', 'package.json', 'yarn.lock', 'jest.preset.js',
    '.yarnrc.yml', '.yarn/releases/**',
]
EXPECTED_PR_FILTERS = {
    'api-unit-tests.yml': {'branches': ['main', 'staging', 'fix/**']},
    'rabbitmq-unit-tests.yml': {
        'paths': SHARED_LIBRARY_PATHS + ['.github/workflows/rabbitmq-unit-tests.yml'],
    },
    'shared-library-unit-tests.yml': {
        'paths': SHARED_LIBRARY_PATHS + ['.github/workflows/shared-library-unit-tests.yml'],
    },
    'lockfile-integrity.yml': {
        'paths': [
            '**/package.json', 'yarn.lock', '.yarnrc.yml', '.yarn/releases/**',
            '.github/workflows/lockfile-integrity.yml',
        ],
    },
    'deployment-safety.yml': '',
}


class PullRequestTriggerTests(unittest.TestCase):
    def setUp(self):
        self.workflows = {
            name: yaml.load((WORKFLOWS / name).read_text(), Loader=yaml.BaseLoader)
            for name in VALIDATION_WORKFLOWS
        }

    def test_push_validation_is_limited_to_integration_branches(self):
        """A fix-branch push must not duplicate its pull-request validation."""
        for name, (_, branches) in VALIDATION_WORKFLOWS.items():
            with self.subTest(workflow=name):
                self.assertEqual(self.workflows[name]['on']['push']['branches'], branches)

    def test_pull_requests_keep_existing_branch_and_path_coverage(self):
        """Deduplication must not suppress the PR run, including stacked fix PRs."""
        for name, expected in EXPECTED_PR_FILTERS.items():
            with self.subTest(workflow=name):
                self.assertEqual(self.workflows[name]['on']['pull_request'], expected)

    def test_integration_pushes_keep_existing_path_coverage(self):
        for name, expected in EXPECTED_PR_FILTERS.items():
            with self.subTest(workflow=name):
                paths = expected.get('paths') if isinstance(expected, dict) else None
                self.assertEqual(self.workflows[name]['on']['push'].get('paths'), paths)

    def test_manual_validation_remains_available(self):
        for name, workflow in self.workflows.items():
            with self.subTest(workflow=name):
                self.assertEqual(set(workflow['on']), {'push', 'pull_request', 'workflow_dispatch'})
                self.assertFalse(workflow['on']['workflow_dispatch'])

    def test_validation_checks_keep_their_names_and_cannot_be_skipped(self):
        for name, (check_name, _) in VALIDATION_WORKFLOWS.items():
            with self.subTest(workflow=name):
                jobs = self.workflows[name]['jobs']
                self.assertEqual(len(jobs), 1)
                job_id, job = next(iter(jobs.items()))
                self.assertEqual(job.get('name', job_id), check_name)
                self.assertNotIn('if', job)
                self.assertNotIn('continue-on-error', job)

    def test_new_commits_still_cancel_older_runs_of_the_same_ref(self):
        for name, workflow in self.workflows.items():
            with self.subTest(workflow=name):
                concurrency = workflow['concurrency']
                self.assertEqual(concurrency['cancel-in-progress'], 'true')
                self.assertIn('${{ github.ref }}', concurrency['group'])


if __name__ == '__main__':
    unittest.main()
