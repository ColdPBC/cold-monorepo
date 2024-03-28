import { Injectable, OnModuleInit } from '@nestjs/common';
import { BaseWorker, DarklyService } from '@coldpbc/nest';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { OpenAI } from 'langchain/llms/openai';
import { ConfigService } from '@nestjs/config';
import { answerable } from './tools/answerable';
import { unanswerable } from './tools/unanswerable';
import { ConversationalRetrievalQAChain } from 'langchain/chains';
import { PromptsService } from '../prompts/prompts.service';

@Injectable()
export class LangchainService extends BaseWorker implements OnModuleInit {
  answerable_schema = answerable;
  unanswerable_schema = unanswerable;

  condense_prompt: string = `Given the chat history and a follow-up question, rephrase the follow-up question to be a standalone question that encompasses all necessary context from the chat history.
      Company:
      {company}

      Chat History:
      {history}

      Follow-up input:
      {question}

    Make sure your standalone question is self-contained, clear, and specific. Rephrased standalone question:`;

  openAIapiKey: string = '';
  returnSourceDocuments: boolean = true;

  /*If the component is "select" or "multi_select", the user will provide a list of options that the company can choose from however it is critically important that you only choose from the values provided in the "options" property.
    If the component is a 'select' then only select one value from the 'options' array, and if the component is 'multi_select' then may select one or more values from the 'options' array.

    If the component is a "yes_no" then you will need to provide a boolean response.

    If the component is 'text' then you will need to provide a text response.

    If the component is a 'number' then you will need to provide a number response.

    If the component is a 'percent_slider' then your answer must be a number between 0 and 100.*/

  constructor(private readonly config: ConfigService, private readonly darkly: DarklyService) {
    super(LangchainService.name);
  }

  async onModuleInit(): Promise<void> {
    this.logger.log('Langchain Service Initialized');
    this.openAIapiKey = this.config.getOrThrow('OPENAI_API_KEY');
    this.returnSourceDocuments = await this.darkly.getBooleanFlag('dynamic-rag-return-source-documents');
  }

  async makeChain(vectorstore: PineconeStore, prompts: PromptsService) {
    const model = new OpenAI({
      temperature: prompts.temperature, // increase temperature to get more creative answers
      modelName: prompts.model,
      openAIApiKey: this.openAIapiKey,
    });

    const chain = ConversationalRetrievalQAChain.fromLLM(model, vectorstore.asRetriever(), {
      qaTemplate: prompts.prompt_template,
      questionGeneratorChainOptions: { template: this.condense_prompt },
      questionGeneratorTemplate: prompts.condense_template,
      returnSourceDocuments: true,
    });
    // Configures the chain to use the QA_PROMPT and CONDENSE_PROMPT prompts and a flag that indicates whether to return source documents
    /* const chain = ConversationalRetrievalQAChain.fromLLM(model, vectorstore.asRetriever(), {
       returnSourceDocuments: true,
     });*/

    return chain;
  }

  /* async makeChain(vectorstore: PineconeStore, returnSourceDocuments: boolean = true) {
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
      });

     return chain;
   }*/
}
