import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, EventPattern, Payload } from '@nestjs/microservices';
import {
  RABBIT_MESSAGE_NAMES,
  RABBIT_EVENT_NAMES,
} from 'common/constant/rabbitmq';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern(RABBIT_EVENT_NAMES.TEST_EVENT_MESSAGE)
  async handleEventMessage(payload: { message: string }) {
    console.log('\n==> EVENT MESSAGE =', payload.message);
  }

  @MessagePattern(RABBIT_MESSAGE_NAMES.TEST_MESSAGE)
  async handleMessage(@Payload() payload: { message: string }) {
    console.log('\n==> MESSAGE =', payload.message);
    return `Message Received: ${payload.message}`;
  }
}
