import { Module, Inject, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { HeartbeatsService } from './heartbeats.service';
import { Car, CarSchema } from './car.schema';
import { RabbitMQModule } from 'src/rabbit-mq/rabbit-mq.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }]),
        forwardRef(() => RabbitMQModule),
    ],
    controllers: [],
    providers: [ HeartbeatsService ],
    exports: [ HeartbeatsService ],
})
export class HeartbeatsModule {}
