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

    this.logger.info('Filtered Dependencies');

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
      `(
                 $title := function($v){$v.title};
                 $section := function($k){$keys(sections)[$k]};
                 $total := function($v){$count($keys($v.follow_up))};
                 $answered := function($v){$count($filter($v.follow_up.*, function($q) { $exists($q.value) and $q.value != null and $q.value != "" and $q.value != "null" }))};
                 $complete := function($v){$total($v) = $answered($v)};
                 $createQuestions := function($v) {
                     $map($keys($v.follow_up), function($key, $v, $o) {
                         $createQuestionObject($v, $key, $o)
                     })
                 };

                 $createQuestionObject := function($idx, $key, $o) {
                     {
                         $key: {
                             "max_score": $lookup(definition.sections.*.follow_up, $key).max_score,
                             "score":$lookup(definition.sections.*.follow_up, $key).score,
                             "user_answered": $exists($lookup(definition.sections.*.follow_up, $key).value) and $lookup(definition.sections.*.follow_up, $key).value != null and $lookup(definition.sections.*.follow_up, $key).value != "" and $lookup(definition.sections.*.follow_up, $key).value != "null" ,
                             "ai_answered": $exists($lookup(definition.sections.*.follow_up, $key).ai_response.answer)
                         }
                     }
                 };

                 $mergeQuestions := function($v) {
                     $merge($createQuestions($v))
                 };

                 $review := function($v){$count($v.follow_up[$k].ai_response.answer and $filter($v.follow_up.*, function($q) { $exists($q.value) }))};
                 $sectionScore := function($v){$sum($v.follow_up.*.score)};
                 $maxSectionScore := function($v){$sum($v.follow_up.*.max_score)};
                 $totalScore := $map(definition.sections.*, function($v, $k, $o) {
                     $sum($v.follow_up.*.score)
                 });
                 $totalReview := $sum($map(definition.sections.*, function($v, $k, $o) {
                     $count($keys($sift($mergeQuestions($v), function($v) { $v.user_answered = false and $v.ai_answered = true })))
                 }));

                 $totalQuestionCount := function(){$count($keys(definition.sections.*.follow_up))};
                 $totalQuestionAnswered := function() { $sum($map(definition.sections.*.follow_up.*, function($v, $k, $o) { $exists($v.value) and $v.value != null and $v.value != "" and $v.value != "null"  ? 1 : 0 })) };

                 $totalMaxScore := function(){$sum(definition.sections.*.follow_up.*.max_score)};

                 {
                     "total_score": $sum($totalScore),
                     "total_max_score": $sum($totalMaxScore()),
                     "total_review": $totalReview,
                     "question_count": $totalQuestionCount(),
                     "percentage": $round($sum($totalScore) / $sum($totalMaxScore()) * 100),
                     "questions_answered": $totalQuestionAnswered(),
                     "sections":$map(definition.sections.*, function($v, $k, $o) {
                         {
                             "section": $section($k),
                             "section_score": $sectionScore($v),
                             "section_max_score": $maxSectionScore($v),
                             "title": $title($v),
                             "total": $total($v),
                             "answered": $answered($v),
                             "complete": $complete($v),
                             "review": $count($keys($sift($mergeQuestions($v), function($v) { $v.user_answered = false and $v.ai_answered = true }))),
                             "questions": $mergeQuestions($v)
                         }
                     })
                 }
       )`,
    );

    // Evaluate the JSONata expression to get the progress
    const progress = await progressExpression.evaluate(filteredObject);

    // Set the progress in the filteredObject
    set(filteredObject, 'progress', progress);

    // Return the filteredObject
    return filteredObject;
  }
}
