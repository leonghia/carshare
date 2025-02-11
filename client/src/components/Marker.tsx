import React from "react";
import { Marker as MarkerPrimitive } from "@goongmaps/goong-map-react";
import { motion } from "motion/react";
import { useMediaQuery } from "react-responsive";
import { Flag, Location } from "iconsax-react";
import { cn } from "@/utils/utils";
import { PlaceDetail } from "@/lib/models";

interface MarkerProps {
  locationType: "Destination" | "Pickup";
  placeDetail: PlaceDetail | null;
}

const Marker = React.forwardRef<typeof MarkerPrimitive, MarkerProps>(
  ({ locationType, placeDetail }, ref) => {
    const isSM = useMediaQuery({ maxWidth: 639 });

    if (!placeDetail?.geometry || !placeDetail.compound) return null;
    return (
      <MarkerPrimitive
        latitude={placeDetail.geometry.location.lat}
        longitude={placeDetail.geometry.location.lng}
        offsetLeft={isSM ? -12 : -16}
        offsetTop={isSM ? -12 : -16}
        // offsetLeft={0}
        // offsetTop={0}
        className="z-10 pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            duration: 1,
          }}
          className="relative"
        >
          <div className="sm:hidden absolute left-0 top-0 -translate-x-[calc(50%-8px)] -translate-y-[calc(100%+12px)] w-max max-w-[260px] min-w-[160px] bg-background-950 border-2 border-divider rounded-xl px-4 py-3">
            <div className="flex-1 min-w-0 space-y-1">
              <p className="text-xs sm:text-xxs font-normal text-foreground-500 w-full truncate">
                {placeDetail.compound.district}, {placeDetail.compound.province}
              </p>
              <p className="text-sm sm:text-xs font-normal text-white w-full truncate">
                {placeDetail.name}
              </p>
            </div>
          </div>
          <div
            className={cn(
              "size-6 sm:size-5 rounded-full border-2 sm:border border-white flex items-center justify-center",
              locationType === "Destination" ? "bg-[#22C55E]" : "bg-[#EF4444]"
            )}
          >
            {locationType === "Destination" ? (
              <Flag variant="Bold" className="size-1/2 text-white" />
            ) : (
              <Location variant="Bold" className="size-1/2 text-white" />
            )}
          </div>
        </motion.div>
      </MarkerPrimitive>
    );
  }
);

export { Marker };
