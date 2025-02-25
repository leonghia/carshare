import { Location } from "./location";

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
