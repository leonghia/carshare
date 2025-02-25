import { CarshareService } from 'src/utils/types/carshare-service';

export class Ride {
  id: string;
  pickupTime: Date;
  service: CarshareService;
}
