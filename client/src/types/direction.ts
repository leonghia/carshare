import { GeocodedWaypoint } from "./geocodeWaypoint";
import { Route } from "./route";

export interface DirectionServiceResponse {
  routes: Route[];
  geocoded_waypoints: GeocodedWaypoint[];
}

export interface DirectionRequestParams {
  origin: string;
  destination: string;
  vehicle: "car";
  api_key: string;
}
