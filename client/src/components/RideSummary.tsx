import {
  RideSummaryTab,
  RideSummary as RideSummaryType,
} from "@/types/rideSummary";
import {
  Calendar,
  Profile2User,
  SmartCar,
  Location,
  Flag,
  Money4,
  MessageText1,
} from "iconsax-react";
import { AnimatePresence, motion, Target, Variants } from "motion/react";
import React from "react";
import emptyDriverInfoIllustrator from "@/assets/images/empty_driver_info_illustration.webp";
import driverPfp from "@/assets/images/driver_duong_van_hung_pfp.webp";
import mercedesBenzC200 from "@/assets/images/mercedes-benz-c200.webp";
import { Button } from "./ui/button";
import { cn } from "@/utils/styling";
import { useMediaQuery } from "react-responsive";
import { Dimensions } from "./ui/screen";

interface RideSummaryProps extends React.ComponentPropsWithoutRef<"div"> {
  rideSummary: RideSummaryType;
}

interface TabContentVariants extends Variants {
  visible: Target;
  hidden: Target;
}

const tabContentVariants: TabContentVariants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};

const RideSummary = React.forwardRef<HTMLDivElement, RideSummaryProps>(
  ({ rideSummary, className }, ref) => {
    const [selectedTab, setSelectedTab] = React.useState<RideSummaryTab>(
      RideSummaryTab.RideInfo
    );
    const isSM = useMediaQuery({ maxWidth: Dimensions.SM.max });

    return (
      <div
        ref={ref}
        className={cn(
          "absolute z-20 bottom-8 left-1/2 w-full max-w-[700px] bg-background-900 rounded-4xl sm:rounded-2xl",
          className
        )}
      >
        {/* Upper */}
        <div className="relative w-full border-b border-[#444755] flex">
          <input
            type="radio"
            id="ride_info"
            name="summary"
            className="hidden peer/rideInfo"
            checked={selectedTab === RideSummaryTab.RideInfo}
            onChange={(_) => setSelectedTab(RideSummaryTab.RideInfo)}
          />
          <label
            htmlFor="ride_info"
            className="flex-none w-1/2 flex justify-center items-center text-sm sm:text-xs font-normal text-foreground-600 cursor-pointer py-4 sm:py-3 peer-checked/rideInfo:font-medium peer-checked/rideInfo:text-primary-500 transition-all duration-300 ease-out"
          >
            Thông tin cuốc xe
          </label>
          <input
            type="radio"
            id="driver_info"
            name="summary"
            className="hidden peer/driverInfo"
            checked={selectedTab === RideSummaryTab.DriverInfo}
            onChange={(_) => setSelectedTab(RideSummaryTab.DriverInfo)}
          />
          <label
            htmlFor="driver_info"
            className="flex-none w-1/2 flex justify-center items-center text-sm sm:text-xs font-normal text-foreground-600 cursor-pointer py-4 sm:py-3 peer-checked/driverInfo:font-medium peer-checked/driverInfo:text-primary-500 transition-all duration-300 ease-out"
          >
            Thông tin tài xế
          </label>
          <div className="absolute w-1/2 h-[3px] sm:h-[2px] bg-primary-500 bottom-0 left-0 transition-all duration-300 ease-out peer-checked/rideInfo:translate-x-0 peer-checked/driverInfo:translate-x-full" />
        </div>
        {/* Lower */}
        <div className="w-full px-8 sm:px-4 py-5 sm:py-3 min-h-[168px] sm:min-h-[112px]">
          {/* Ride Info */}
          <AnimatePresence mode="popLayout" initial={false}>
            {selectedTab === RideSummaryTab.RideInfo ? (
              <motion.div
                key="ride_info"
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
                className="w-full grid grid-cols-[repeat(5,max-content)] sm:grid-cols-[repeat(3,minmax(0,max-content))] auto-rows-min justify-between gap-y-4 sm:gap-y-2 items-center"
              >
                {/* Datetime */}
                <div className="flex items-center gap-2 sm:col-start-1 sm:row-start-1">
                  <Calendar
                    variant="Bold"
                    className="flex-none size-5 sm:size-4 text-foreground-500"
                  />
                  <span className="flex-none w-[38px] sm:w-[32px] inline-block text-sm sm:text-xs font-normal text-foreground-400">
                    15:00
                  </span>
                  <span className="flex-none w-[82px] sm:w-[70px] inline-block text-sm sm:text-xs font-normal text-foreground-400">
                    02/02/2025
                  </span>
                </div>
                {/* Divider */}
                <span className="sm:hidden inline-block w-px h-[14px] sm:h-[10px] rounded bg-foreground-700" />
                {/* Service */}
                <div className="flex gap-2 sm:row-start-4">
                  <SmartCar
                    variant="Bold"
                    className="flex-none size-5 sm:size-4 text-foreground-500 -translate-y-[2px]"
                  />
                  <span className="inline-block flex-1 text-sm sm:text-xs font-normal text-foreground-400">
                    Carshare Premium
                  </span>
                </div>
                {/* Divider */}
                <span className="sm:hidden inline-block w-px h-[14px] rounded bg-foreground-700" />
                {/* Numbers of passengers */}
                <div className="flex items-center gap-2 sm:row-start-1 sm:col-start-3">
                  <Profile2User
                    variant="Bold"
                    className="flex-none size-5 sm:size-4 text-foreground-500"
                  />
                  <span className="inline-block text-sm sm:text-xs font-normal text-foreground-400">
                    2 hành khách
                  </span>
                </div>
                {/* Pickup */}
                <div className="col-span-full flex items-center gap-2">
                  <Location
                    variant="Bold"
                    className="flex-none size-5 sm:size-4 text-foreground-500"
                  />
                  <span className="flex-1 truncate text-sm sm:text-xs font-normal text-foreground-400">
                    37 ngõ 73 Giang Văn Minh, Đội Cấn, Ba Đình, Hà Nội
                  </span>
                </div>
                {/* Destination */}
                <div className="col-span-full flex items-center gap-2">
                  <Flag
                    variant="Bold"
                    className="flex-none size-5 sm:size-4 text-foreground-500"
                  />
                  <span className="flex-1 truncate text-sm sm:text-xs font-normal text-foreground-400">
                    91 Chùa Láng, Láng Thượng, Đống Đa, Hà Nội
                  </span>
                </div>
                {/* Fare */}
                <div className="col-span-full flex items-center gap-2 justify-self-center sm:row-start-4 sm:col-span-2 sm:justify-self-end sm:pl-6">
                  <Money4
                    variant="Bold"
                    className="flex-none size-5 sm:size-4 text-[#F59E0B]"
                  />
                  <span className="flex-1 truncate text-sm sm:text-xs font-medium text-[#F59E0B]">
                    124.800đ
                  </span>
                </div>
              </motion.div>
            ) : true ? (
              <motion.div
                key="driver_info"
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
                className="w-full space-y-4"
              >
                <div className="w-full grid grid-cols-[repeat(2,max-content)] justify-between items-center">
                  <div className="flex items-center gap-4 sm:gap-3">
                    <figure className="flex-none size-[60px] sm:size-10 rounded-full bg-background-800 overflow-hidden">
                      <img
                        src={driverPfp}
                        alt="driver profile picture"
                        className="size-full object-contain object-bottom"
                      />
                    </figure>
                    <div className="space-y-2 sm:space-y-1">
                      <p className="max-w-[260px] truncate text-base sm:text-xs font-medium text-white">
                        Dương Văn Hùng
                      </p>
                      <div className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-4 sm:size-[10px] text-[#F59E0B]"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm sm:text-xxs font-normal text-[#F59E0B]">
                          4.9
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    intent="secondary"
                    size={isSM ? "extraSmall" : "small"}
                    iconOnly={isSM}
                  >
                    <MessageText1 variant="Bold" />
                    {!isSM && "Nhắn tin"}
                  </Button>
                </div>
                <div className="w-full flex items-center gap-8 sm:gap-0 sm:justify-between">
                  <div className="flex-none w-[24%] md:w-[150px] space-y-1 sm:space-y-0">
                    <p className="text-xs sm:text-xxs font-normal text-foreground-600">
                      Phương tiện
                    </p>
                    <p className="text-sm sm:text-xs font-medium text-foreground-300 truncate">
                      Mercedes-Benz C200
                    </p>
                  </div>
                  <div className="flex-none w-[15%] md:w-[100px] space-y-1 sm:space-y-0">
                    <p className="text-xs sm:text-xxs font-normal text-foreground-600">
                      Biển kiểm soát
                    </p>
                    <p className="text-sm sm:text-xs font-medium text-foreground-300 truncate">
                      29-B1 993.83
                    </p>
                  </div>
                  <figure className="flex-none w-[60px] sm:w-12 h-[30px] sm:h-6">
                    <img
                      src={mercedesBenzC200}
                      alt="car picture"
                      className="size-full object-contain"
                    />
                  </figure>
                </div>
              </motion.div>
            ) : (
              <div
                key="empty_driver_info"
                className="space-y-2 sm:space-y-1 mx-auto w-fit"
              >
                <figure>
                  <img
                    src={emptyDriverInfoIllustrator}
                    alt="empty driver info illustrator"
                    className="w-[120px] sm:w-[86px] h-[96px] sm:h-[70px] object-contain"
                  />
                </figure>
                <p className="text-xs sm:text-xxs font-normal text-foreground-600 text-center">
                  Chưa có thông tin
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }
);

const MotionRideSummary = motion.create(RideSummary);

export { RideSummary, MotionRideSummary };
