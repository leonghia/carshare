import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Ride } from './ride.entity';
import { RIDE_PROVIDE } from 'src/constants/provide';

@Injectable()
export class RideService {
  public constructor(
    @Inject(RIDE_PROVIDE) private rideRepository: Repository<Ride>,
  ) {}

  public async findAll(): Promise<Ride[]> {
    return this.rideRepository.find();
  }
}
