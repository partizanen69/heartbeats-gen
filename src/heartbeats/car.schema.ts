import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types as MongooseTypes } from 'mongoose';

import { CarStatus } from 'src/heartbeats/heartbeats.enum';

@Schema()
export class Car extends Document {
    @Prop({ required: true })
    name: string;

    @Prop()
    assignedDriver: MongooseTypes.ObjectId;
    
    @Prop({ required: true })
    status: CarStatus;
}

export const CarSchema = SchemaFactory.createForClass(Car);