import { CarshareService } from "./carshare-service";

export interface RideSummary {
  pickupTime: Date;
  service: CarshareService;
  numbersOfPassengers: number;
  pickupPlace: string;
  destination: string;
}

export enum RideSummaryTab {
  RideInfo,
  DriverInfo,
}
