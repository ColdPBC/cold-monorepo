import { z } from 'zod';
import { BaseWorker } from '@coldpbc/nest';
import { UnprocessableEntityException } from '@nestjs/common';

export type OpenAIResponseType = z.infer<typeof OpenAIResponse.ai_responseSchema>;
export type OpenAIAnswerType = z.infer<typeof OpenAIResponse.answerSchema>;
export type OpenAIWhatWeNeedType = z.infer<typeof OpenAIResponse.what_we_needSchema>;
export type OpenAIJustificationType = z.infer<typeof OpenAIResponse.justificationSchema>;

export class OpenAIResponse extends BaseWorker {
  static answerSchema = z.union([z.string(), z.array(z.string()), z.boolean()]).optional();
  static what_we_needSchema = z.string().optional();
  static justificationSchema = z.string().optional();
  static ai_responseSchema = z
    .object({
      answer: this.answerSchema,
      what_we_need: this.what_we_needSchema,
      justification: this.justificationSchema,
    })
    .strip()
    .transform(data => {
      if (data.what_we_need) {
        delete data.answer;
      }
      return data;
    });

  answer: OpenAIAnswerType;
  what_we_need: OpenAIWhatWeNeedType;
  justification: OpenAIJustificationType;

  constructor(response: any) {
    super(OpenAIResponse.name);

    if (typeof response === 'string') {
      response = JSON.parse(response);
    }

    /*
    if (!this.isValid(response)) {
      throw new UnprocessableEntityException({ ...response }, 'Invalid response');
    } else {
      const validated = OpenAIResponse.validate(response)['data'];
      return validated;
    }*/
  }

  static validate(data: OpenAIResponse): z.SafeParseReturnType<OpenAIResponseType, OpenAIResponseType> {
    const response = this.ai_responseSchema.safeParse(data);
    return response;
  }

  validate() {
    const test = OpenAIResponse.validate(this);
    if (!test.success) {
      this.logger.error(test);
    }

    return test['data'];
  }

  isValid(data: OpenAIResponse): boolean {
    const response = OpenAIResponse.ai_responseSchema.safeParse(data);
    if (!response.success) {
      this.logger.error(response);
    }

    return response.success;
  }
}
