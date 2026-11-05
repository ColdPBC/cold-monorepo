"""Keep the required Storybook check available to every pull request."""
from pathlib import Path
import unittest
import yaml

ROOT = Path(__file__).resolve().parents[2]

class StorybookWorkflowTests(unittest.TestCase):
    def test_every_pull_request_and_merge_group_gets_the_required_job(self):
        path = ROOT / '.github/workflows/storybook-ui-tests.yml'
        self.assertTrue(path.is_file(), 'Storybook has no required-check workflow')
        workflow = yaml.load(path.read_text(), Loader=yaml.BaseLoader)
        for event in ['pull_request', 'merge_group']:
            self.assertIn(event, workflow['on'])
            self.assertFalse(workflow['on'][event], 'No branch, path, or action filters may suppress the gate')
        self.assertNotIn('pull_request_target', workflow['on'])
        job = workflow['jobs']['storybook-ui-tests']
        self.assertEqual(job.get('name', 'storybook-ui-tests'), 'storybook-ui-tests')
        self.assertNotIn('if', job)
        self.assertNotIn('continue-on-error', job)
        self.assertEqual(workflow['permissions'], {'contents': 'read'})
        self.assertTrue(job['timeout-minutes'])
        for step in job['steps']:
            self.assertNotIn('continue-on-error', step)

if __name__ == '__main__':
    unittest.main()
