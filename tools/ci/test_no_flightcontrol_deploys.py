"""Validate repository CI contracts without executing deployment commands."""
from pathlib import Path
import json
import re
import subprocess
import unittest
from urllib.parse import urlparse

import yaml

ROOT = Path(__file__).resolve().parents[2]
WORKFLOWS = ROOT / '.github' / 'workflows'


def workflows():
    for path in sorted(WORKFLOWS.glob('*.y*ml')):
        yield path.name, yaml.load(path.read_text(), Loader=yaml.BaseLoader)


def strings(value):
    if isinstance(value, str):
        yield value
    elif isinstance(value, dict):
        for child in value.values():
            yield from strings(child)
    elif isinstance(value, list):
        for child in value:
            yield from strings(child)


class NoFlightcontrolDeploymentTests(unittest.TestCase):
    def test_no_workflow_calls_flightcontrol(self):
        """A workflow must never invoke Flightcontrol, even from a manual job."""
        for name, workflow in workflows():
            for job in workflow.get('jobs', {}).values():
                for step in job.get('steps', []):
                    actions = [step.get('run', ''), step.get('uses', ''), *strings(step.get('with', {}))]
                    for action in actions:
                        urls = re.findall(r'https?://[^\s\"\'<>]+', action)
                        hosts = [urlparse(url).hostname or '' for url in urls]
                        self.assertFalse(
                            any(host == 'flightcontrol.dev' or host.endswith('.flightcontrol.dev') for host in hosts),
                            f'{name} exposes a Flightcontrol action',
                        )
                        self.assertFalse(
                            re.search(r'(?i)flightcontrol[^\s]*/', step.get('uses', '')),
                            f'{name} uses a Flightcontrol action',
                        )

    def test_no_flightcontrol_environment_manifests(self):
        """The repository must not offer deployable Flightcontrol environments."""
        for manifest in ROOT.glob('flightcontrol*.json'):
            self.assertFalse(bool(json.loads(manifest.read_text()).get('environments', [])),
                             f'{manifest.name} still defines deployable environments')

    def test_e2e_targets_require_explicit_manual_input(self):
        """An external deployment notification must not start API tests."""
        all_workflows = dict(workflows())
        for name in ['e2e_test.yml', 'production_e2e_test.yml']:
            with self.subTest(workflow=name):
                workflow = all_workflows[name]
                self.assertEqual(set(workflow['on']), {'workflow_dispatch'})
                target = workflow['on']['workflow_dispatch']['inputs']['api_url']
                self.assertEqual(target['required'], 'true')
                self.assertFalse(target.get('default'), 'Remote test targets must be supplied explicitly')
                self.assertEqual(workflow['env']['API_SERVER_URL'], '${{ inputs.api_url }}')
                test_steps = [step for job in workflow['jobs'].values() for step in job.get('steps', [])
                              if 'cold-api-e2e:e2e:ci' in step.get('run', '')]
                self.assertTrue(test_steps, 'Retain the API E2E test runner')
                for step in test_steps:
                    self.assertNotIn('if', step, 'Explicit manual tests must not be skipped by deployment conditions')
                    self.assertNotIn('API_SERVER_URL=', step['run'], 'Use the supplied API_SERVER_URL environment')


    def test_remote_e2e_execution_is_disabled(self):
        """Legacy mutating remote tests must remain blocked until isolated safely."""
        all_workflows = dict(workflows())
        for name in ['e2e_test.yml', 'production_e2e_test.yml']:
            workflow = all_workflows[name]
            for job in workflow['jobs'].values():
                if any('cold-api-e2e:e2e:ci' in step.get('run', '') for step in job.get('steps', [])):
                    self.assertEqual(job.get('if'), '${{ false }}', name)
                    self.assertIsInstance(job.get('env'), dict)
            diagnostic = workflow['jobs']['explain-disabled-tests']
            self.assertFalse(diagnostic.get('env'))
            for step in diagnostic['steps']:
                result = subprocess.run(['bash', '-c', step['run']], capture_output=True, text=True)
                self.assertEqual(result.returncode, 1)
                self.assertIn('::error::', result.stdout)

    def test_release_is_preserved_without_pr_publication(self):
        """Releases keep the existing main-only behavior and never run on PRs."""
        all_workflows = dict(workflows())
        self.assertTrue('release.yml' in all_workflows, 'Preserve the existing release job')
        release = all_workflows['release.yml']
        self.assertEqual(set(release['on']), {'push', 'workflow_dispatch'})
        self.assertEqual(release['on']['push']['branches'], ['main'])
        self.assertEqual(release['jobs']['release']['if'], "github.ref == 'refs/heads/main'")
        self.assertEqual(release['permissions'], {'contents': 'write', 'issues': 'write', 'pull-requests': 'write'})
        config = yaml.safe_load((ROOT / '.releaserc.yml').read_text())
        self.assertEqual([branch['name'] for branch in config['branches']], ['main'])


if __name__ == '__main__':
    unittest.main()
