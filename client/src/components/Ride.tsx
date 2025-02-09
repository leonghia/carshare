import React from "react";
import { useParams } from "react-router";
import { PageTitle } from "./ui/pageTitle";
import { cn, formatDate, timeFormatter } from "@/lib/utils";
import { Button } from "./ui/button";
import { DirectRight, Location, Flag } from "iconsax-react";
import {
  StaticMap,
  MapRef,
  WebMercatorViewport,
  Source,
  Layer,
} from "@goongmaps/goong-map-react";
import { GGMAPS_MAPTILES_KEY } from "@/lib/config";

interface Update {
  id: string;
  createdAt: Date;
  status:
    | RideStatus.Processing
    | RideStatus.Incoming
    | RideStatus.Reached
    | RideStatus.Arriving
    | RideStatus.Finished;
  isRead: boolean;
}

interface AssignationUpdate extends Omit<Update, "status"> {
  carInfo: CarInfo;
  status: RideStatus.Assigned;
}

interface CarInfo {
  id: string;
  licensePlate: string;
}

enum RideStatus {
  Processing,
  Assigned,
  Incoming,
  Reached,
  Arriving,
  Finished,
}

const updates: (Update | AssignationUpdate)[] = [
  {
    id: "1",
    createdAt: new Date("2025-02-01T05:18:00Z"),
    status: RideStatus.Processing,
    isRead: false,
  },
  {
    id: "2",
    createdAt: new Date("2025-02-01T05:30:00Z"),
    status: RideStatus.Assigned,
    isRead: false,
    carInfo: {
      id: "carfdsfd",
      licensePlate: "29-B1 993.83",
    },
  },
  {
    id: "3",
    createdAt: new Date("2025-02-01T06:05:00Z"),
    status: RideStatus.Incoming,
    isRead: false,
  },
  {
    id: "4",
    createdAt: new Date("2025-02-01T06:20:00Z"),
    status: RideStatus.Reached,
    isRead: false,
  },
  {
    id: "5",
    createdAt: new Date("2025-02-01T06:23:00Z"),
    status: RideStatus.Arriving,
    isRead: false,
  },
  {
    id: "6",
    createdAt: new Date("2025-02-01T06:45:00Z"),
    status: RideStatus.Finished,
    isRead: false,
  },
];

updates.reverse();

const statusText = (update: Update | AssignationUpdate): React.ReactNode => {
  switch (update.status) {
    case RideStatus.Processing:
      return "Cuốc xe đang được xử lý";
    case RideStatus.Assigned:
      return "Cuốc xe đã được giao cho xe " + update.carInfo.licensePlate;
    case RideStatus.Incoming:
      return "Xe đang trên đường đến điểm đón";
    case RideStatus.Reached:
      return "Xe đã đến điểm đón";
    case RideStatus.Arriving:
      return "Xe đang trên đường đến điểm đích";
    case RideStatus.Finished:
      return "Xe đã đến điểm đích";
    default:
      const unexpected: never = update;
      throw new Error("invalid status");
  }
};

interface StatusIconProps extends React.ComponentPropsWithRef<"svg"> {
  status: RideStatus;
}

const StatusIcon = ({
  status,
  className,
}: StatusIconProps): React.JSX.Element => {
  switch (status) {
    case RideStatus.Processing:
      return (
        <svg
          className={cn(className)}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.46537 2.19998C3.8667 1.33331 5.2447 1.33331 8.00003 1.33331C10.7554 1.33331 12.1334 1.33331 12.5347 2.19998C12.5694 2.27376 12.5983 2.35065 12.6214 2.43065C12.8947 3.35531 11.92 4.42731 9.97203 6.57065L8.6667 7.99998L9.97203 9.42865C11.92 11.5726 12.894 12.6446 12.6214 13.5686C12.5983 13.648 12.5693 13.7256 12.5347 13.8006C12.1334 14.6666 10.7554 14.6666 8.00003 14.6666C5.2447 14.6666 3.8667 14.6666 3.46537 13.8C3.43083 13.7253 3.40186 13.6482 3.3787 13.5693C3.10537 12.6446 4.08003 11.5726 6.02803 9.42931L7.33337 7.99998L6.02803 6.57131C4.08003 4.42665 3.1067 3.35531 3.3787 2.43131C3.40181 2.35131 3.4307 2.27465 3.46537 2.19998Z"
            fill="currentColor"
          />
        </svg>
      );
    case RideStatus.Assigned:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={cn(className)}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M14 5a1 1 0 0 1 .694 .28l.087 .095l3.699 4.625h.52a3 3 0 0 1 2.995 2.824l.005 .176v4a1 1 0 0 1 -1 1h-1.171a3.001 3.001 0 0 1 -5.658 0h-4.342a3.001 3.001 0 0 1 -5.658 0h-1.171a1 1 0 0 1 -1 -1v-6l.007 -.117l.008 -.056l.017 -.078l.012 -.036l.014 -.05l2.014 -5.034a1 1 0 0 1 .928 -.629zm-7 11a1 1 0 1 0 0 2a1 1 0 0 0 0 -2m10 0a1 1 0 1 0 0 2a1 1 0 0 0 0 -2m-6 -9h-5.324l-1.2 3h6.524zm2.52 0h-.52v3h2.92z" />
        </svg>
      );
    case RideStatus.Incoming:
    case RideStatus.Arriving:
      return <DirectRight variant="Bold" className={cn(className)} />;
    case RideStatus.Reached:
      return <Location variant="Bold" className={cn(className)} />;
    case RideStatus.Finished:
      return <Flag variant="Bold" className={cn(className)} />;
    default:
      const unexpected: never = status;
      throw new Error("invalid status");
  }
};

export function Ride(): React.JSX.Element {
  return (
    // Main
    <main className="w-full pl-16">
      {/* Wrapper */}
      <div className="ml-auto w-full h-full max-w-[1800px] grid grid-cols-[43%,minmax(0,1fr)]">
        {/* Left Section */}
        <LeftSection />
        {/* Right Section */}
        <RightSection />
      </div>
    </main>
  );
}

function LeftSection({
  className,
}: React.ComponentPropsWithRef<"section">): React.JSX.Element {
  const { rideId } = useParams();
  return (
    <section
      className={cn(
        "pt-16 pb-12 grid gap-16 grid-rows-[repeat(2,min-content),minmax(0,1fr)]",
        className
      )}
    >
      {/* Title */}
      <div className="w-full space-y-4">
        <PageTitle title="Cuốc xe của bạn" />
        <p className="text-base font-normal text-foreground-600">
          ID #{rideId}
        </p>
      </div>
      {/* Updates */}
      <div className="w-full space-y-10">
        <h2 className="w-full text-lg font-medium text-white">
          Cập nhật mới nhất
        </h2>
        {/* List */}
        <ul className="relative w-full space-y-8">
          <div className="absolute w-px h-[calc(100%-32px)] bottom-1 left-4 border-r-divider border-r border-dashed" />
          {updates.map((update, i) => {
            const isHighlight = i === 0 && !update.isRead;
            return (
              <li key={update.id} className="w-full flex gap-8">
                {/* Icon */}
                <div
                  className={cn(
                    "flex-none size-8 rounded-full flex items-center justify-center -translate-y-1",
                    isHighlight ? "bg-primary-flat" : "bg-background-900"
                  )}
                >
                  <StatusIcon
                    status={update.status}
                    className={cn(
                      "size-4",
                      isHighlight ? "text-primary-500" : "text-foreground-600"
                    )}
                  />
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0 flex gap-10">
                  <div className="flex gap-8">
                    <p className="text-base font-normal text-foreground-600">
                      {formatDate(update.createdAt)}
                    </p>
                    <p className="text-base font-normal text-foreground-600">
                      {timeFormatter.format(update.createdAt)}
                    </p>
                  </div>
                  <p
                    className={cn(
                      "text-base font-normal",
                      isHighlight ? "text-primary-500" : "text-foreground-300"
                    )}
                  >
                    {statusText(update)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {/* Cancel Button */}
      <Button intent="danger" className="w-[180px] h-[60px] self-end">
        Hủy cuốc xe
      </Button>
    </section>
  );
}

function RightSection(): React.JSX.Element {
  return (
    <section className="relative min-h-[930px]">
      {/* Vertical Overlay */}
      <div className="absolute z-10 inset-0 bg-[linear-gradient(180deg,rgba(39,42,55,1)0%,rgba(39,42,55,1)10%,rgba(39,42,55,0)50%,rgba(39,42,55,1)85%,rgba(39,42,55,1)100%)]" />
      {/* Horizontal Overlay */}
      <div className="absolute z-10 inset-0 bg-[linear-gradient(90deg,rgba(39,42,55,1)0%,rgba(39,42,55,0.1)40%)]" />
      {/* Map */}
      <StaticMap
        latitude={21.02686595596347}
        longitude={105.85375738102857}
        zoom={13}
        width="100%"
        height="100%"
        mapStyle="https://tiles.goong.io/assets/goong_map_dark.json"
        goongApiAccessToken={GGMAPS_MAPTILES_KEY}
      />
      {/* Summary */}
      <Summary className="absolute z-20 bottom-8 left-1/2 -translate-x-1/2 w-[87%] min-w-[750px] max-w-[800px] h-[224px] bg-background-900 rounded-4xl" />
    </section>
  );
}

enum CarshareService {
  Basic,
  Premium,
  Extra,
}

interface RideSummary {
  pickupAt: Date;
  service: CarshareService;
  numbersOfPassengers: number;
  pickup: string;
  destination: string;
}

interface SummaryProps extends React.ComponentPropsWithRef<"div"> {
  rideSummary?: RideSummary;
}

enum Tab {
  RideInfo,
  DriverInfo,
}

function Summary({ className }: SummaryProps): React.JSX.Element {
  const [selectedTab, setSelectedTab] = React.useState<Tab>(Tab.RideInfo);

  return (
    <div className={cn(className)}>
      {/* Upper */}
      <div className="relative w-full border-b border-[#444755] flex">
        <input
          type="radio"
          id="ride_info"
          name="summary"
          className="hidden peer/rideInfo"
          checked={selectedTab === Tab.RideInfo}
          onChange={(_) => setSelectedTab(Tab.RideInfo)}
        />
        <label
          htmlFor="ride_info"
          className="flex-none w-1/2 flex justify-center items-center text-sm font-normal text-foreground-600 cursor-pointer py-4 peer-checked/rideInfo:font-medium peer-checked/rideInfo:text-primary-500 transition-all duration-300 ease-out"
        >
          Thông tin cuốc xe
        </label>
        <input
          type="radio"
          id="driver_info"
          name="summary"
          className="hidden peer/driverInfo"
          checked={selectedTab === Tab.DriverInfo}
          onChange={(_) => setSelectedTab(Tab.DriverInfo)}
        />
        <label
          htmlFor="driver_info"
          className="flex-none w-1/2 flex justify-center items-center text-sm font-normal text-foreground-600 cursor-pointer py-4 peer-checked/driverInfo:font-medium peer-checked/driverInfo:text-primary-500 transition-all duration-300 ease-out"
        >
          Thông tin tài xế
        </label>
        <div className="absolute w-1/2 h-[3px] bg-primary-500 bottom-0 left-0 transition-all duration-300 ease-out peer-checked/rideInfo:translate-x-0 peer-checked/driverInfo:translate-x-full" />
      </div>
      {/* Lower */}
      <div></div>
    </div>
  );
}
