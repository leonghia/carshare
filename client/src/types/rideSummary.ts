import { CarshareService } from "./carshareService";

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
