import { DataSource } from 'typeorm';
import { Ride } from 'src/modules/ride/ride.entity';
import { DATABASE_PROVIDE, RIDE_PROVIDE } from 'src/constants/provide';

export const rideProvider = [
  {
    provide: RIDE_PROVIDE,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Ride),
    inject: [DATABASE_PROVIDE],
  },
];
