import { CarshareService } from 'src/utils/types/carshare-service';

export class RideSummaryDto {
  pickupTime: Date;
  service: CarshareService;
  numbersOfPassengers: number;
  pickupPlace: string;
  destination: string;
}
