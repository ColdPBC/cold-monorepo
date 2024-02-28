import { Injectable } from '@nestjs/common';
import jsonata from 'jsonata';
import { BaseWorker } from '@coldpbc/nest';

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
          break; // No need to check follow-ups if the section is already removed
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
    return filteredObject;
  }
}
