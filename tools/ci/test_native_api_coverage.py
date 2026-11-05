"""The API coverage check must expose the native root command's exit status."""
from pathlib import Path
import json
import unittest

import yaml

ROOT = Path(__file__).resolve().parents[2]


class NativeApiCoverageTests(unittest.TestCase):
    def test_native_coverage_gate_runs_without_suppression(self):
        path = ROOT / '.github/workflows/api-coverage.yml'
        self.assertTrue(path.exists(), 'The native API coverage check must be visible in CI')
        workflow = yaml.load(path.read_text(), Loader=yaml.BaseLoader)
        self.assertIn('main', workflow['on']['push']['branches'])
        self.assertIn('pull_request', workflow['on'])
        job = workflow['jobs']['api-coverage']
        self.assertNotEqual(job.get('continue-on-error'), 'true')
        commands = [step for step in job['steps'] if step.get('name') == 'Run native API coverage gate']
        self.assertEqual(len(commands), 1)
        step = commands[0]
        self.assertNotEqual(step.get('continue-on-error'), 'true')
        self.assertEqual(step['run'], 'node .yarn/releases/yarn-4.4.1.cjs test --runInBand --skipNxCache')
        self.assertEqual(json.loads((ROOT / 'package.json').read_text())['scripts']['test'],
                         'nx run cold-api:test:ci')
        nx = json.loads((ROOT / 'nx.json').read_text())
        self.assertTrue(nx['targetDefaults']['@nx/jest:jest']['configurations']['ci']['codeCoverage'])


if __name__ == '__main__':
    unittest.main()
