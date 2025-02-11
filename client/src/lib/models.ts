export interface DirectionServiceResponse {
  routes: Route[];
  geocoded_waypoints: GeocodedWaypoint[];
}

export interface Route {
  legs: Leg[];
  overview_polyline: {
    points: string;
  };
}

export interface Leg {
  distance: {
    text: string;
    value: number;
  };
  duration: {
    text: string;
    value: number;
  };
}

export interface GeocodedWaypoint {
  geocoder_status: "OK";
  place_id: string;
}

export interface PlaceDetail {
  place_id: string;
  formatted_address: string;
  geometry: { location: Location };
  name: string;
  compound: {
    district: string;
    province: string;
  };
}

export interface Location {
  lat: number;
  lng: number;
}
