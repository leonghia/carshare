import { Leg } from "./leg";

export interface Route {
  legs: Leg[];
  overview_polyline: {
    points: string;
  };
}
