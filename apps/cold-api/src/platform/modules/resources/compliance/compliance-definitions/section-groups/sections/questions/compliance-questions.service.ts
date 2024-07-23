import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseWorker, ComplianceQuestionsRepository } from '@coldpbc/nest';
import { compliance_questions } from '@prisma/client';

@Injectable()
export class ComplianceQuestionsService extends BaseWorker {
  constructor(readonly complianceQuestionsRepository: ComplianceQuestionsRepository) {
    super(ComplianceQuestionsService.name);
  }

  /**
   * Creates a compliance question.
   *
   * @param {compliance_questions} createComplianceQuestionDto - The data for creating a compliance question.
   *
   * @return {Promise<compliance_questions>} - Resolves to the created compliance question.
   */
  create(createComplianceQuestionDto: compliance_questions) {
    return this.complianceQuestionsRepository.createQuestion(createComplianceQuestionDto);
  }

  /**
   * Creates multiple compliance questions in the database.
   *
   * @param {compliance_questions[]} createComplianceQuestionDto - An array of compliance question objects to be created.
   *
   * @return {Promise<compliance_questions[]>} - A promise that resolves to an array of created compliance question objects.
   */
  createMany(createComplianceQuestionDto: compliance_questions[]) {
    return this.complianceQuestionsRepository.createQuestions(createComplianceQuestionDto);
  }

  /**
   * Finds all compliance questions based on the provided compliance definition name, section_id, and section_group_id.
   *
   * @param {string} compliance_definition_name - The name of the compliance definition.
   *
   * @param compliance_section_id<string>
   * @returns {Promise<Array<Question>>} - A promise that resolves to an array of Question objects representing the compliance questions found.
   */
  findAll({
    compliance_definition_name,
    compliance_section_id,
    compliance_section_group_id,
  }: {
    compliance_definition_name?: string;
    compliance_section_id?: string;
    compliance_section_group_id?: string;
  }) {
    if (!compliance_definition_name && !compliance_section_id) throw new BadRequestException('you must provide either compliance_definition_name or compliance_section_id');
    return this.complianceQuestionsRepository.getQuestionList({ compliance_section_id, compliance_section_group_id, compliance_definition_name });
  }

  /**
   * Finds a question based on the given parameters.
   *
   * @param {Object} options - The options object.
   * @param {string} [options.id] - The ID of the question to find.
   * @param {string} [options.compliance_definition_name] - The compliance definition name of the question to find.
   * @param {string} [options.key] - The key of the question to find.
   *
   * @returns {Promise<Object>} - A promise that resolves to the question object if found, otherwise resolves to undefined.
   *
   * @throws {Error} - Throws an error if neither id nor compliance_definition_name and key are provided.
   */
  findOne({ id, compliance_definition_name, key }: { id?: string; compliance_definition_name?: string; key?: string }): Promise<any> {
    if (id) return this.complianceQuestionsRepository.getQuestion(id);

    if (compliance_definition_name && key)
      return this.complianceQuestionsRepository.getQuestionByKeyAndComplianceName({
        compliance_definition_name,
        key,
      });

    throw new Error('you must provide either id or compliance_definition_name and key');
  }

  /**
   * Updates a compliance question.
   *
   * @param {compliance_questions} updateComplianceQuestionDto - The updated compliance question object.
   * @return {Promise<void>} - A promise that resolves when the question is updated successfully.
   */
  update(updateComplianceQuestionDto: compliance_questions) {
    return this.complianceQuestionsRepository.updateQuestion(updateComplianceQuestionDto);
  }

  /**
   * Removes a complianceQuestion by its ID.
   *
   * @param {number} id - The ID of the complianceQuestion to be removed.
   * @return {string} - A message indicating the removal of the complianceQuestion.
   */
  async remove(id: string): Promise<void | Error> {
    return this.complianceQuestionsRepository.deleteQuestion(id);
  }
}
