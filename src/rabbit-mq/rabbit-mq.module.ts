import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { RabbitMQController } from './rabbit-mq.controller';
import { RabbitMQService } from './rabbit-mq.service';
import { HeartbeatsModule } from 'src/heartbeats/heartbeats.module';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'rabbit-mq-module',
                transport: Transport.RMQ,
                options: {
                    urls: [ 'amqp://localhost:5672', ],
                    queue: 'rabbit-mq-nest-js',
                },
            },
        ]),
        HeartbeatsModule,
    ],
    controllers: [ RabbitMQController ],
    providers: [ RabbitMQService ],
    exports: [ RabbitMQService ],
})
export class RabbitMQModule {}