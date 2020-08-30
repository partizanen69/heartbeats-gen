import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';

import { HeartbeatsService } from 'src/heartbeats/heartbeats.service';
import { RabbitMQService } from './rabbit-mq.service';
import { UpdateActiveCarsDto } from 'src/heartbeats/heartbeats.dto';

@Controller()
export class RabbitMQController {
  constructor(
      private rabbitMQService: RabbitMQService,
      private heartbeatsService: HeartbeatsService,
    ) {}

    @MessagePattern('car-change-status')
    getNotifications(@Payload() data: UpdateActiveCarsDto, @Ctx() context: RmqContext): void {
        console.log(`Received pattern "car-change-status" with payload`, data);
        this.heartbeatsService.updateActiveCars(data);
    }
}