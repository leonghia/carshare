import React from "react";
import { Header } from "./header";
import { Outlet } from "react-router";

export function UserLayout(): React.JSX.Element {
  return (
    <div className="w-full min-h-screen bg-background-950 grid grid-rows-[max-content,minmax(0,1fr)]">
      <Header />
      <Outlet />
    </div>
  );
}
