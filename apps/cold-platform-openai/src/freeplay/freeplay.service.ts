import { Injectable, OnModuleInit } from '@nestjs/common';
import Freeplay, { getCallInfo, getSessionInfo } from 'freeplay/thin';
import { BaseWorker } from '@coldpbc/nest';
import { ConfigService } from '@nestjs/config';

export interface FPSession {
  sessionId: string;
  customMetadata?: IFPSession;
}

export interface ICFPSession {
  compliance_set: string;
  organization: string;
  user: string;

  [key: string]: any;
}

export interface IFPSession {
  survey: string;
  organization: string;
  user: string;

  [key: string]: any;
}

@Injectable()
export class FreeplayService extends BaseWorker implements OnModuleInit {
  public client: Freeplay;

  constructor(readonly config: ConfigService) {
    super(FreeplayService.name);

    this.client = new Freeplay({
      freeplayApiKey: this.config.getOrThrow('FREEPLAY_API_KEY'),
      baseUrl: 'https://coldclimate.freeplay.ai/api',
    });
  }

  async onModuleInit() {}

  async createComplianceSession(metadata: ICFPSession) {
    return this.client.sessions.create({ customMetadata: metadata });
  }

  async createSession(metadata: IFPSession) {
    return this.client.sessions.create({ customMetadata: metadata });
  }

  async getPrompt(template_name: string, variables: any, formatted = true) {
    if (formatted)
      return await this.client.prompts.getFormatted({
        projectId: 'f98682e7-7dec-4d9c-a74b-28819dca3e3a',
        templateName: template_name,
        environment: process.env['NODE_ENV'] === 'development' ? 'latest' : process.env['NODE_ENV'] || 'unknown environment',
        variables: variables,
      });

    return await this.client.prompts.get(variables);
  }

  // @ts-expect-error - TS6133: 'session' is declared but its value is never read.
  async recordCompletion(session: any, promptVars: any, prompt: any, openAIResponse, start: Date, end: Date) {
    const sessionId = session?.sessionId;
    if (!sessionId) {
      this.logger.error('Session ID not found', { session });
      return;
    }
    try {
      const recording = await this.client.recordings.create({
        allMessages: prompt.allMessages(openAIResponse.choices[0].message),
        inputs: promptVars,
        sessionInfo: getSessionInfo(session),
        promptInfo: prompt.promptInfo,
        callInfo: getCallInfo(prompt?.promptInfo, start, end),
        responseInfo: {
          isComplete: 'stop_sequence' === openAIResponse?.choices[0]?.stop,
        },
      });

      return recording;
    } catch (error) {
      this.logger.error('Failed to record completion', { session, promptVars, prompt, openAIResponse, start, end });
    }
  }
}
