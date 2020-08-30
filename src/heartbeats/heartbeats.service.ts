import { Injectable } from '@nestjs/common';

import { Model, Types as MongooseTypes } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { UpdateActiveCarsDto } from './heartbeats.dto';
import { CarStatus } from './heartbeats.enum';
import { Car } from './car.schema';
import { RabbitMQService } from 'src/rabbit-mq/rabbit-mq.service';

@Injectable()
export class HeartbeatsService {
    private activeCars: activeCarsInterface = {};
    private counter: number = 0
    
    constructor(
        @InjectModel(Car.name) private carModel: Model<Car>,
        private readonly rabbitMQService: RabbitMQService,
    ) {
        this.initializeActiveCars();
        setInterval(() => {
            this.generateHeartBeats();
        }, 2000);
    }

    generateHeartBeats(): void {
        for (let carId in this.activeCars) {
            const assignedDriver: string = this.activeCars[carId];

            const heartbeat: HeartbeatsInterface = {
                carId,
                assignedDriver,
                lat: Math.floor(Math.random() * 90 * 1000000) / 1000000,
                long: Math.floor(Math.random() * 180 * 1000000) / 1000000,
                speed: Math.floor(Math.random() * 200),
                counter: ++this.counter,
            };
            
            this.rabbitMQService.send('car-heartbeat', heartbeat);
        }
    }
    
    async initializeActiveCars(): Promise<void> {
        const cars = await this.carModel.find({ status: CarStatus.ACTIVE });

        for (let i = 0; i < cars.length; i++) {
            const c = cars[i];
            
            const carId: string = c._id.toString();
            if (!c.assignedDriver) {
                console.warn(`Car ${carId} has no assignedDriver property`);
                continue;
            }
            
            if (!this.activeCars[carId]) {
                const assignedDriver: string = c.assignedDriver.toString()
                this.activeCars[carId] = assignedDriver;
            }
        }

        console.log(`Initialized active cars object containing ` +
            `${Object.keys(this.activeCars).length} car(s)`);
    }

    updateActiveCars(updateActiveCarsDto: UpdateActiveCarsDto): void {
        const { carId, status, assignedDriver } = updateActiveCarsDto;

        if (status === CarStatus.ACTIVE) this.activeCars[carId] = assignedDriver;
        else delete this.activeCars[carId];

        console.log(`Active cars object contains ${Object.keys(this.activeCars).length}` +
            ` car(s) after update`);
    }
}

interface activeCarsInterface {
    [key: string]: string,
}

interface HeartbeatsInterface {
    carId: string,
    lat: number,
    long: number,
    assignedDriver: string,
    speed: number,
    counter: number,
}