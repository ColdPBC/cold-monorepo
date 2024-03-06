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
    // Create a deep copy of the JSON object
    const filteredObject = JSON.parse(JSON.stringify(jsonObject)); // Create a deep copy of the JSON object

    // Iterate over each section in the filteredObject
    for (const sectionKey in filteredObject.definition.sections) {
      const section = filteredObject.definition.sections[sectionKey];
      // Check for a dependency at the section level
      if (section.dependency?.expression) {
        // Evaluate the JSONata expression for the dependency
        const jsonAtaX = jsonata(section.dependency.expression);
        const dependencyMet = await jsonAtaX.evaluate(filteredObject);

        // If the dependency is not met, remove the section from the filteredObject
        if (!dependencyMet) {
          delete filteredObject.definition.sections[sectionKey];
          continue; // No need to check follow-ups if the section is already removed
        } else {
          // If the dependency is met, remove the dependency from the section
          delete filteredObject.definition.sections[sectionKey].dependency;
        }
      }

      // Iterate over each follow-up question in the section
      for (const currentQuestionKey in section.follow_up) {
        const currentQuestion = section.follow_up[currentQuestionKey];

        delete currentQuestion.rubric;
        // Check for a dependency at the follow-up question level
        if (currentQuestion.dependency?.expression) {
          // Evaluate the JSONata expression for the dependency
          const jsonAtaX = jsonata(currentQuestion.dependency.expression);
          const dependencyMet = await jsonAtaX.evaluate(jsonObject);

          // If the dependency is not met, remove the follow-up question from the section
          if (!dependencyMet) {
            delete filteredObject.definition.sections[sectionKey].follow_up[currentQuestionKey];
          } else {
            // If the dependency is met, remove the dependency from the follow-up question
            delete filteredObject.definition.sections[sectionKey].follow_up[currentQuestionKey].dependency;
          }
        }
      }
    }

    this.logger.info('Filtered Dependencies', { original: jsonObject.definition, filtered: filteredObject.definition });

    // Create a JSONata expression to filter out empty sections
    const filterEmptySections = jsonata(`$sift(sections, function($v, $k, $i, $o) { $count($keys($v.follow_up)) > 0 })`);

    // Evaluate the JSONata expression to get the filtered sections
    const filteredSections = await filterEmptySections.evaluate(filteredObject.definition);

    // Replace the sections in the filteredObject with the filtered sections
    filteredObject.definition.sections = filteredSections;

    /**
     * This JSONata expression is used to transform and summarize data from a survey.
     *
     * @function $title - This function returns the title of a given section.
     * @function $section - This function returns the key of a given section.
     * @function $total - This function counts the total number of follow-up questions in a given section.
     * @function $answered - This function counts the number of answered follow-up questions in a given section.
     * @function $complete - This function checks if all follow-up questions in a given section have been answered.
     * @function $questions - This function creates an object for each follow-up question, indicating whether the user and AI have answered the question.
     * @function $createQuestions - This function creates an array of question objects for a given section.
     * @function $createQuestionObject - This function creates an object for a given question, including the score and whether the user and AI have answered the question.
     * @function $mergeQuestions - This function merges the question objects for a given section into a single object.
     * @function $review - This function counts the number of questions that the AI has answered but the user has not.
     * @function $sectionScore - This function calculates the total score for a given section.
     * @function $map - This function iterates over each section and creates a new object for each one, including the section key, score, title, total number of questions, number of answered questions, whether the section is complete, number of questions to review, and the questions object.
     */
    // Create a JSONata expression to calculate the progress
    const progressExpression = jsonata(
      '  (\n' +
        '        $title := function($v){$v.title};\n' +
        '        $section := function($k){$keys(sections)[$k]};\n' +
        '        $total := function($v){$count($keys($v.follow_up))};\n' +
        '        $answered := function($v){$count($filter($v.follow_up.*, function($q) { $exists($q.value) }))};\n' +
        '        $complete := function($v){$total($v) = $answered($v)};\n' +
        '        $questions := function($v){$merge($map($keys($v.follow_up), function($key) { {$key: {"user_answered": $exists($v.follow_up[$key].value) and $v.follow_up[$key].value != null, "ai_answered": $exists($v.follow_up[$key].ai_response.answer) and $v.follow_up[$key].ai_response.answer != null}}}))};\n' +
        '        $createQuestions := function($v) {\n' +
        '            $map($keys($v.follow_up), function($key, $v, $o) { \n' +
        '                $createQuestionObject($v, $key, $o)\n' +
        '            })\n' +
        '        };\n' +
        '            \n' +
        '        $createQuestionObject := function($idx, $key, $o) {\n' +
        '            { \n' +
        '                $key: {\n' +
        '                    "max_score": $lookup(definition.sections.*.follow_up, $key).max_score,\n' +
        '                    "score":$lookup(definition.sections.*.follow_up, $key).score,\n' +
        '                    "user_answered": $exists($lookup(definition.sections.*.follow_up, $key).value),\n' +
        '                    "ai_answered": $exists($lookup(definition.sections.*.follow_up, $key).ai_response.answer)\n' +
        '                }\n' +
        '            }\n' +
        '        };\n' +
        '            \n' +
        '        $mergeQuestions := function($v) {\n' +
        '            $merge($createQuestions($v))\n' +
        '        };\n' +
        '        \n' +
        '        $review := function($v){$count($v.follow_up[$k].ai_response.answer and $filter($v.follow_up.*, function($q) { $exists($q.value) }))};\n' +
        '        $sectionScore := function($v){$sum($v.follow_up.*.score)};\n' +
        '        $maxSectionScore := function($v){$sum($v.follow_up.*.max_score)};\n' +
        '        $totalScore := $map(definition.sections.*, function($v, $k, $o) {\n' +
        '            $sum($v.follow_up.*.score)\n' +
        '        });\n' +
        '        $totalReview := $sum($map(definition.sections.*, function($v, $k, $o) {\n' +
        '            $count($keys($sift($mergeQuestions($v), function($v) { $v.user_answered = false and $v.ai_answered = true })))\n' +
        '        }));\n' +
        '                \n' +
        '        $totalQuestionCount := function(){$count($keys(definition.sections.*.follow_up))};\n' +
        '        $totalQuestionAnswered := function(){$count($exists(definition.sections.*.follow_up.*.value))};\n' +
        '\n' +
        '        $totalMaxScore := function(){$sum(definition.sections.*.follow_up.*.max_score)}; \n' +
        '        \n' +
        '        {\n' +
        '            "total_score": $sum($totalScore),\n' +
        '            "total_max_score": $sum($totalMaxScore()),\n' +
        '            "total_review": $totalReview,\n' +
        '            "question_count": $totalQuestionCount(),\n' +
        '            "percentage": $sum($totalScore) / $sum($totalMaxScore()) * 100,\n' +
        '            "questions_answered": $totalQuestionAnswered(),\n' +
        '            "sections":$map(definition.sections.*, function($v, $k, $o) {\n' +
        '                {\n' +
        '                    "section": $section($k),\n' +
        '                    "section_score": $sectionScore($v),\n' +
        '                    "section_max_score": $maxSectionScore($v),\n' +
        '                    "title": $title($v),\n' +
        '                    "total": $total($v),\n' +
        '                    "answered": $answered($v),\n' +
        '                    "complete": $complete($v),\n' +
        '                    "review": $count($keys($sift($mergeQuestions($v), function($v) { $v.user_answered = false and $v.ai_answered = true }))),\n' +
        '                    "questions": $mergeQuestions($v)\n' +
        '                }\n' +
        '            })\n' +
        '        }\n' +
        '   )\n' +
        '',
    );

    // Evaluate the JSONata expression to get the progress
    const progress = await progressExpression.evaluate(filteredObject);

    // Set the progress in the filteredObject
    set(filteredObject, 'progress', progress);

    // Return the filteredObject
    return filteredObject;
  }
}
