import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RabbitMQModule } from './rabbit-mq/rabbit-mq.module';
import { HeartbeatsModule } from './heartbeats/heartbeats.module';

@Module({
  imports: [ 
        MongooseModule.forRoot('mongodb://localhost/crud-api'),  
        RabbitMQModule,
        HeartbeatsModule,
    ],
    controllers: [],
})
export class AppModule {}