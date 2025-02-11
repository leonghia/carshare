import { cn } from "@/lib/utils";
import { Routing } from "iconsax-react";
import { Hourglass } from "lucide-react";
import { motion } from "motion/react";
import React from "react";

export interface DirectionRequestParams {
  origin: string;
  destination: string;
  vehicle: "car";
  api_key: string;
}

interface DirectionInfoProps extends React.ComponentPropsWithoutRef<"div"> {
  distanceText: string;
  durationText: string;
}

const DirectionInfoPrimitive = React.forwardRef<
  HTMLDivElement,
  DirectionInfoProps
>(({ distanceText, durationText, className }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-background-900 rounded-3xl sm:rounded-xl px-6 sm:px-4 py-3 sm:py-2 grid grid-cols-[repeat(2,max-content)] gap-10 sm:gap-6 items-center",
      className
    )}
  >
    <div className="grid grid-cols-[repeat(2,max-content)] sm:grid-cols-[max-content,minmax(0,1fr)] gap-x-4 sm:gap-x-2 gap-y-1 sm:gap-y-[2px] items-center">
      <Routing
        variant="Bold"
        className="size-6 sm:size-4 text-primary-500 row-span-2 sm:row-span-1 sm:row-start-2"
      />
      <p className="text-xs sm:text-xxs font-normal text-foreground-600 sm:col-span-2">
        Khoảng cách quãng đường
      </p>
      <p className="text-sm sm:text-xs font-medium sm:font-normal text-white">
        {distanceText}
      </p>
    </div>
    <div className="grid grid-cols-[repeat(2,max-content)] sm:grid-cols-[max-content,minmax(0,1fr)] gap-x-3 sm:gap-x-2 gap-y-1 sm:gap-y-[2px] items-center">
      <Hourglass className="size-5 sm:size-3 text-primary-500 row-span-2 sm:row-span-1 sm:row-start-2" />
      <p className="text-xs sm:text-xxs font-normal text-foreground-600 sm:col-span-2">
        Thời gian di chuyển dự kiến
      </p>
      <p className="text-sm sm:text-xs font-medium sm:font-normal text-white">
        {durationText}
      </p>
    </div>
  </div>
));

const DirectionInfo = motion.create(DirectionInfoPrimitive);

export { DirectionInfo };
