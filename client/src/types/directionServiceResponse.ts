import { GeocodedWaypoint } from "./geocodeWaypoint";
import { Route } from "./Route";

export interface DirectionServiceResponse {
  routes: Route[];
  geocoded_waypoints: GeocodedWaypoint[];
}
