import { ClientOptions, Transport } from '@nestjs/microservices';
import { RABBIT_QUEUES } from 'common/constant/rabbitmq';

import * as dotenv from 'dotenv';

if (['development', 'test'].includes(process.env.NODE_ENV)) {
  dotenv.config({
    path: '.env.development',
  });
}

interface IRabbitConfig {
  host: string;
  port: number;
  username: string;
  password: string;
}

interface IConfig {
  nodeEnv: string;
  rabbit: IRabbitConfig;
}

export const APP_CONFIG: IConfig = {
  nodeEnv: process.env.NODE_ENV,
  rabbit: {
    host: process.env.RABBIT_HOST,
    port: Number.parseInt(process.env.RABBIT_PORT, 10) || 5672,
    username: process.env.RABBIT_USERNAME || undefined,
    password: process.env.RABBIT_PASSWORD || undefined,
  },
};

export class ConfigService {
  privateConfig = APP_CONFIG;

  get config() {
    return this.privateConfig;
  }

  get rabbitConfig(): ClientOptions {
    const { username, password, port, host } = this.config.rabbit;
    const rabbitUrl =
      username && password
        ? `amqp://${username}:${password}@${host}:${port}`
        : `amqp://${host}:${port}`;
    const options: ClientOptions = {
      transport: Transport.RMQ,
      options: {
        urls: [rabbitUrl],
        queue: RABBIT_QUEUES.MESSAGE_1,
        queueOptions: {
          durable: true,
        },
      },
    };

    return options;
  }
}
