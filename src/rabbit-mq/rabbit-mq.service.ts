import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
    constructor(
        @Inject('rabbit-mq-module') private readonly client: ClientProxy,
    ) {}

    async send(pattern: string, data: any): Promise<void> {
        console.log(
            `Sending pattern "${pattern}" with payload:`, 
            JSON.stringify(data),
        );
        this.client.emit<number>(pattern, data);
    }
}