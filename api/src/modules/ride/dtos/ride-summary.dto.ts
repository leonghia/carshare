import { CarshareService } from 'src/constants/carshare-service';

export class RideSummaryDto {
  pickupTime: Date;
  service: CarshareService;
  numbersOfPassengers: number;
  pickupPlace: string;
  destination: string;
}
