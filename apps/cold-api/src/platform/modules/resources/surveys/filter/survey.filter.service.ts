import { Injectable } from '@nestjs/common';
import jsonata from 'jsonata';
import { BaseWorker } from '@coldpbc/nest';
import { set } from 'lodash';

@Injectable()
export class SurveyFilterService extends BaseWorker {
  constructor() {
    super(SurveyFilterService.name);
  }

  async filterDependencies(jsonObject: any): Promise<any> {
    const filteredObject = JSON.parse(JSON.stringify(jsonObject)); // Create a deep copy of the JSON object

    for (const sectionKey in filteredObject.sections) {
      const section = filteredObject.sections[sectionKey];
      // Check for a filter at the section level
      if (section.dependency?.expression) {
        const jsonAtaX = jsonata(section.dependency.expression);
        const dependencyMet = await jsonAtaX.evaluate(filteredObject);

        if (!dependencyMet) {
          delete filteredObject.sections[sectionKey];
          continue; // No need to check follow-ups if the section is already removed
        } else {
          delete filteredObject.sections[sectionKey].dependency;
        }
      }

      for (const currentQuestionKey in section.follow_up) {
        const currentQuestion = section.follow_up[currentQuestionKey];

        if (currentQuestion.dependency?.expression) {
          const jsonAtaX = jsonata(currentQuestion.dependency.expression);
          const dependencyMet = await jsonAtaX.evaluate(jsonObject);

          if (!dependencyMet) {
            delete filteredObject.sections[sectionKey].follow_up[currentQuestionKey];
          } else {
            delete filteredObject.sections[sectionKey].follow_up[currentQuestionKey].dependency;
          }
        }
      }
    }

    this.logger.info('Filtered Dependencies', { original: jsonObject, filtered: filteredObject });
    const filterEmptySections = jsonata(`$sift(sections, function($v, $k, $i, $o) { $count($keys($v.follow_up)) > 0 })`);

    const filteredSections = await filterEmptySections.evaluate(filteredObject);

    filteredObject.sections = filteredSections;

    const progressExpression = jsonata(
      '(\n' +
        '    $title := function($v){$v.title};\n' +
        '    $section := function($k){$keys(sections)[$k]};\n' +
        '    $total := function($v){$count($keys($v.follow_up))};\n' +
        '    $answered := function($v){$count($filter($v.follow_up.*, function($q) { $exists($q.value) }))};\n' +
        '    $complete := function($v){$total($v) = $answered($v)};\n' +
        '    $questions := function($v){$merge($map($keys($v.follow_up), function($key) { {$key: {"user_answered": $exists($v.follow_up[$key].value) and $v.follow_up[$key].value != null, "ai_answered": $exists($v.follow_up[$key].ai_response.answer) and $v.follow_up[$key].ai_response.answer != null}}}))};\n' +
        '    $createQuestions := function($v) {\n' +
        '        $map($keys($v.follow_up), function($key, $v, $o) { $createQuestionObject($v, $key, $o) })\n' +
        '    };\n' +
        '    $createQuestionObject := function($idx, $key, $o) {\n' +
        '        {\n' +
        '            $key: {\n' +
        '                "user_answered": $exists($lookup(sections.*.follow_up, $key).value),\n' +
        '                "ai_answered": $exists($lookup(sections.*.follow_up, $key).ai_response.answer)\n' +
        '            }\n' +
        '        }\n' +
        '    };\n' +
        '    $mergeQuestions := function($v) {\n' +
        '        $merge($createQuestions($v))\n' +
        '    };\n' +
        '    $review := function($v){$count($v.follow_up[$k].ai_response.answer and $filter($v.follow_up.*, function($q) { $exists($q.value) }))};\n' +
        '  \n' +
        '  $map(sections.*, function($v, $k, $o) {\n' +
        '    {\n' +
        '      "section": $section($k),\n' +
        '      "title": $title($v),\n' +
        '      "total": $total($v),\n' +
        '      "answered": $answered($v),\n' +
        '      "complete": $complete($v),\n' +
        '      "review": $count($keys($sift($mergeQuestions($v), function($v) { $v.user_answered = false and $v.ai_answered = true }))),\n' +
        '      "questions": $mergeQuestions($v)\n' +
        '    }\n' +
        '  })\n' +
        ')',
    );
    set(filteredObject, 'progress', await progressExpression.evaluate(filteredObject));
    return filteredObject;
  }
}
