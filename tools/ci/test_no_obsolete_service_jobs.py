"""Keep retired external CI services out of the executable workflow graph."""
from pathlib import Path
import unittest

import yaml

WORKFLOWS = Path(__file__).resolve().parents[2] / '.github' / 'workflows'


def action_references(value):
    if isinstance(value, dict):
        if isinstance(value.get('uses'), str):
            yield value['uses'].split('@', 1)[0].lower()
        for child in value.values():
            yield from action_references(child)
    elif isinstance(value, list):
        for child in value:
            yield from action_references(child)


class RetiredServiceWorkflowTests(unittest.TestCase):
    def assert_action_retired(self, action):
        for path in sorted(WORKFLOWS.glob('*.y*ml')):
            workflow = yaml.load(path.read_text(), Loader=yaml.BaseLoader)
            self.assertNotIn(action, set(action_references(workflow.get('jobs', {}))),
                             f'{path.name} still invokes the retired {action} integration')

    def test_chromatic_deployment_is_removed(self):
        self.assert_action_retired('chromaui/action')

    def test_datadog_static_analysis_is_removed(self):
        self.assert_action_retired('datadog/datadog-static-analyzer-github-action')

    def test_datadog_sca_upload_is_removed(self):
        self.assert_action_retired('datadog/datadog-sca-github-action')


if __name__ == '__main__':
    unittest.main()
