import React from "react";
import { useParams } from "react-router";

export function Ride(): React.JSX.Element {
  const params = useParams();
  console.log(params.rideId);

  return <div>Tinh trang cuoc xe</div>;
}
