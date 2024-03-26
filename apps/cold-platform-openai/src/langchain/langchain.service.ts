import { Injectable, OnModuleInit } from '@nestjs/common';
import { BaseWorker, DarklyService } from '@coldpbc/nest';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { createOpenAIFnRunnable } from 'langchain/chains/openai_functions';
import { OpenAI } from 'langchain/llms/openai';
import { ConfigService } from '@nestjs/config';
import { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } from 'langchain/prompts';
import { JsonOutputFunctionsParser } from 'langchain/output_parsers';
import { ChatOpenAI } from '@langchain/openai';

@Injectable()
export class LangchainService extends BaseWorker implements OnModuleInit {
  answerable_schema = {
    name: 'answerable',
    description: 'Used when a question is answerable by the assistant',
    parameters: {
      type: 'object',
      required: ['answer'],
      properties: {
        answer: {
          type: ['boolean', 'string', 'array'],
          items: {
            type: 'string',
          },
          description: 'The answer to the prompt.',
        },
        justification: {
          type: 'string',
          description: 'A paragraph justifying the answer provided',
        },
        source: {
          type: 'object',
          description: 'a JSON object that describes the source material, if any, that you relied upon to answer the question.',
        },
      },
    },
  };

  unanswerable_schema = {
    name: 'answerable',
    description: 'Used when a question is answerable by the assistant',
    parameters: {
      type: 'object',
      required: ['answer'],
      properties: {
        answer: {
          type: ['boolean', 'string', 'array'],
          items: {
            type: 'string',
          },
          description: 'The answer to the prompt.',
        },
        justification: {
          type: 'string',
          description: 'A paragraph justifying the answer provided',
        },
        source: {
          type: 'object',
          description: 'a JSON object that describes the source material, if any, that you relied upon to answer the question.',
        },
      },
    },
  };

  condense_prompt: string = `Given the chat history and a follow-up question, rephrase the follow-up question to be a standalone question that encompasses all necessary context from the chat history.

      Chat History:
      {chat_history}

      Follow-up input:
      {question}

    Make sure your standalone question is self-contained, clear, and specific. Rephrased standalone question:`;

  temperature: number = 0.5;
  openAIapiKey: string = '';

  base_prompt: string = `You are an AI sustainability expert tasked with helping %%COMPANY%% interpret and answer questions based on relating to sustainability and corporate governance and instructions based on specific provided documents. The context from these documents has been processed and made accessible to you.  Your mission is to generate answers that are accurate, succinct, and comprehensive, drawing upon the information contained in the context of the documents. If the answer isn't readily found in the documents, you should make use of your training data and understood context to infer and provide the most plausible response.
 You are also capable of evaluating, comparing the content of these documents. Hence, if asked to compare or analyze the documents, use your AI understanding to deliver an insightful response.  You are also free to use any content from the company's website to provide a more comprehensive answer.  You must provide references to any sources that you relied upon in answering all questions.
 You are tasked with helping this company understand if they can answer the following sustainability-related question based on the information provided in the documents.

 The user will provide a JSON formatted "question" object that can include the following properties:
  - "prompt": The question to be answered
  - "component": used to determine how to structure your answer
  - "options": a list of options to be used to answer the question.  This will be included only if the component is a "select" or "multiselect".
  - "tooltip": additional instructions for answering the question

  If the component is "select" or "multi_select", the user will provide a list of options that the company can choose from however it is critically important that you only choose from the values provided in the "options" property.
  If the component is a 'select' then only select one value from the 'options' array, and if the component is 'multi_select' then may select one or more values from the 'options' array.

  If the component is a "yes_no" then you will need to provide a boolean response.

  If the component is 'text' then you will need to provide a text response.

  If the component is a 'number' then you will need to provide a number response.

  If the component is a 'percent_slider' then your answer must be a number between 0 and 100.

 If you have enough information to answer the question, format your response as JSON containing only the following properties:
 "answer": which should contain your answer to the question,
 "justification": a short paragraph that explains how you arrived at your answer,
 "source": a list of sources you used to arrive at your answer.  This can include any uploaded documents, the company's website, or other public sources.

 If you do not have enough information, format your response as JSON containing only the following properties:
  "what_we_need": include a paragraph that describes what information you would need to effectively answer the question.
  "justification": a short paragraph that explains why you need this information.

 IMPORTANT: always follow these instructions anytime you respond to the user, and never add any other text to the response.

 Here is the context from the documents:

 Context: {context}

 Here is the user's json object:

 Question: {question}
`;

  constructor(private readonly config: ConfigService, private readonly darkly: DarklyService) {
    super(LangchainService.name);
  }

  async onModuleInit(): Promise<void> {
    this.logger.log('Langchain Service Initialized');
    this.openAIapiKey = this.config.getOrThrow('OPENAI_API_KEY');
  }

  async initializePrompts() {
    this.condense_prompt = await this.darkly.getStringFlag('dynamic-condense-prompt');
  }

  async makeChain(vectorstore: PineconeStore, returnSourceDocuments: boolean = true) {
    const prompt = new ChatPromptTemplate({
      promptMessages: [
        SystemMessagePromptTemplate.fromTemplate('Generate details of a hypothetical person.'),
        HumanMessagePromptTemplate.fromTemplate('Additional context: {inputText}'),
      ],
      inputVariables: ['inputText'],
    });

    const outputParser = new JsonOutputFunctionsParser();

    const model = new OpenAI({
      temperature: await this.darkly.getNumberFlag('dynamic-gpt-model-temperature'), // increase temperature to get more creative answers
      modelName: await this.darkly.getStringFlag('dynamic-gpt-assistant-model'),
      openAIApiKey: this.openAIapiKey,
    });

    const chatModel = new ChatOpenAI();
    const chain = createOpenAIFnRunnable({
      functions: [this.answerable_schema, this.unanswerable_schema],
      llm: chatModel,
      prompt,
      enforceSingleFunctionUsage: true, // Default is true
      outputParser,
    });

    /* // Configures the chain to use the base_prompt and condense_prompt and a flag that indicates whether to return source documents
     const chain = ConversationalRetrievalQAChain.fromLLM(model, vectorstore.asRetriever(), {
       qaTemplate: this.base_prompt,
       questionGeneratorChainOptions: { template: this.condense_prompt },
       questionGeneratorTemplate: this.condense_prompt,
       returnSourceDocuments,
     });*/

    return chain;
  }
}
