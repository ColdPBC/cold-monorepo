import { Injectable, OnModuleInit } from '@nestjs/common';
import { BaseWorker } from '@coldpbc/nest';
import { PineconeService } from '../pinecone/pinecone.service';
import { LangchainService } from '../langchain/langchain.service';
import { ConfigService } from '@nestjs/config';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';

@Injectable()
export class ChatService extends BaseWorker implements OnModuleInit {
  constructor(private readonly config: ConfigService, private readonly pc: PineconeService, private readonly lc: LangchainService) {
    super(ChatService.name);
  }

  async onModuleInit() {}

  async askQuestion(indexName: string, question: string, modelTemperature = 0.5): Promise<any> {
    const index = this.pc.pinecone.Index(indexName as string);

    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings({
        openAIApiKey: this.config.getOrThrow('OPENAI_API_KEY') as string,
      }),
      {
        pineconeIndex: index,
        textKey: 'text',
        namespace: indexName,
      },
    );

    const chain = this.lc.makeChain(vectorStore, modelTemperature, openAIapiKey as string);

    /*const outputParser = new JsonOutputFunctionsParser();
    const chatModel = new ChatOpenAI({});
    const prompt = ChatPromptTemplate.fromMessages([
      ['system', this.basePrompt],
      ['user', '{question}'],
    ]);

    const runnable = createOpenAIFnRunnable({
      functions: [answerable, unanswerable],
      llm: chatModel,
      prompt,
      outputParser,
    });

    const chain = makeChain(await this.pc.getVectorStore(indexName), true, modelTemperature, this.config.getOrThrow('OPENAI_API_KEY') as string);

    const response = await chain.pipe(runnable).invoke({
      question: question,
      chat_history: history || [],
    });

    return response;*/
  }
}
