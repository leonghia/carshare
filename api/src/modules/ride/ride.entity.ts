import { CarshareService } from 'src/constants/carshare-service';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ride {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 129 })
  rideId: string;

  @Column({ type: 'timestamp with time zone' })
  pickupTime: Date;

  @Column({ type: 'smallint' })
  service: CarshareService;

  @Column({ type: 'smallint' })
  numbersOfPassengers: number;

  @Column({ type: 'integer' })
  distanceInMeters: number;

  @Column({ type: 'integer' })
  estimatedDurationInSeconds: number;

  @Column({ type: 'integer' })
  actualDurationInSeconds: number | null;

  @Column({ type: 'money' })
  fare: number;

  @Column({ type: 'varchar', length: 129 })
  pickupPlaceId: string;

  @Column({ type: 'varchar', length: 129 })
  destinationPlaceId: string;
}
