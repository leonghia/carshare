import { Module } from '@nestjs/common';
import { RideService } from './ride.service';
import { rideProvider } from 'src/providers/ride.provider';
import { DatabaseModule } from 'src/modules/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...rideProvider, RideService],
})
export class RideModule {}
