import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, EventPattern, Payload } from '@nestjs/microservices';
import { PATTERN_NAMES } from 'common/constant/rabbitmq';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern(PATTERN_NAMES.EMIT_PATTERN)
  async handleEventMessage(payload: { message: string }) {
    console.log('\n==> EVENT MESSAGE =', payload.message);
  }

  @MessagePattern(PATTERN_NAMES.SEND_PATTERN)
  async handleMessage(@Payload() payload: { message: string }) {
    console.log('\n==> MESSAGE =', payload.message);
    return `Message Received: ${payload.message}`;
  }
}
