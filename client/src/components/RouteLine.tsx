import { Route } from "@/lib/models";
import { Layer, Source } from "@goongmaps/goong-map-react";
import polyline from "@mapbox/polyline";
import React from "react";

export function RouteLine({
  route,
}: {
  route: Route | null;
}): React.JSX.Element | null {
  if (!route) return null;
  const geometry_string = route.overview_polyline.points;
  const geoJSON: GeoJSON.FeatureCollection<GeoJSON.Geometry> = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: polyline.toGeoJSON(geometry_string),
        properties: null,
      },
    ],
  };
  return (
    <Source id="route" type="geojson" data={geoJSON}>
      <Layer
        id="route"
        type="line"
        source="route"
        layout={{ "line-join": "round", "line-cap": "round" }}
        paint={{ "line-color": "#1D90F5", "line-width": 4 }}
      />
    </Source>
  );
}
