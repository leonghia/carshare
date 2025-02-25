import { CarshareService } from "./carshare-service";

export interface RideSummary {
  pickupAt: Date;
  service: CarshareService;
  numbersOfPassengers: number;
  pickup: string;
  destination: string;
}

export enum RideSummaryTab {
  RideInfo,
  DriverInfo,
}
