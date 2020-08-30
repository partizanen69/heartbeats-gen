import { IsNotEmpty } from 'class-validator';

import { CarStatus } from './heartbeats.enum';

export class UpdateActiveCarsDto {
    @IsNotEmpty()
    carId: string;
    
    @IsNotEmpty()
    status: CarStatus;
    
    @IsNotEmpty()
    assignedDriver: string;
}