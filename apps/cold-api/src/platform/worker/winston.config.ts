import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston/dist/winston.utilities';
// Testing
const winstonConfig = (context: string) => {
  const config = {
    context: context,
    tags: ['nest.js', 'winston'],
    transports: [
      new winston.transports.Console({
        format:
          process.env.NODE_ENV === 'development'
            ? winston.format.combine(winston.format.combine(winston.format.timestamp(), nestWinstonModuleUtilities.format.nestLike()))
            : winston.format.combine(winston.format.timestamp(), winston.format.json(), winston.format.align()),
      }),
    ],
  };

  //console.log('winstonConfig', config);

  return config;
};

export default winstonConfig;
