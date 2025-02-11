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
  ({ rideSummary }, ref) => {
    const [selectedTab, setSelectedTab] = React.useState<RideSummaryTab>(
      RideSummaryTab.RideInfo
    );

    return (
      <div
        ref={ref}
        className="absolute z-20 bottom-8 left-1/2 w-[87%] min-w-[750px] 2xl:min-w-[660px] max-w-[800px] xl:max-w-[750px] bg-background-900 rounded-4xl"
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
            className="flex-none w-1/2 flex justify-center items-center text-sm font-normal text-foreground-600 cursor-pointer py-4 peer-checked/rideInfo:font-medium peer-checked/rideInfo:text-primary-500 transition-all duration-300 ease-out"
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
            className="flex-none w-1/2 flex justify-center items-center text-sm font-normal text-foreground-600 cursor-pointer py-4 peer-checked/driverInfo:font-medium peer-checked/driverInfo:text-primary-500 transition-all duration-300 ease-out"
          >
            Thông tin tài xế
          </label>
          <div className="absolute w-1/2 h-[3px] bg-primary-500 bottom-0 left-0 transition-all duration-300 ease-out peer-checked/rideInfo:translate-x-0 peer-checked/driverInfo:translate-x-full" />
        </div>
        {/* Lower */}
        <div className="w-full px-8 py-5 h-[168px]">
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
                className="w-full grid grid-cols-[repeat(5,max-content)_minmax(0,1fr)] auto-rows-min gap-x-10 gap-y-4 items-center"
              >
                {/* Datetime */}
                <div className="flex items-center gap-2">
                  <Calendar
                    variant="Bold"
                    className="flex-none size-5 text-foreground-500"
                  />
                  <span className="flex-none w-[38px] inline-block text-sm font-normal text-foreground-400">
                    15:00
                  </span>
                  <span className="flex-none w-[82px] inline-block text-sm font-normal text-foreground-400">
                    02/02/2025
                  </span>
                </div>
                {/* Divider */}
                <span className="inline-block w-px h-[14px] rounded bg-foreground-700" />
                {/* Service */}
                <div className="flex gap-2">
                  <SmartCar
                    variant="Bold"
                    className="flex-none size-5 text-foreground-500 -translate-y-[2px]"
                  />
                  <span className="inline-block flex-1 text-sm font-normal text-foreground-400">
                    Carshare Premium
                  </span>
                </div>
                {/* Divider */}
                <span className="inline-block w-px h-[14px] rounded bg-foreground-700" />
                {/* Numbers of passengers */}
                <div className="flex items-center gap-2">
                  <Profile2User
                    variant="Bold"
                    className="flex-none size-5 text-foreground-500"
                  />
                  <span className="inline-block text-sm font-normal text-foreground-400">
                    2 hành khách
                  </span>
                </div>
                {/* Pickup */}
                <div className="col-span-full flex items-center gap-2">
                  <Location
                    variant="Bold"
                    className="flex-none size-5 text-foreground-500"
                  />
                  <span className="flex-1 truncate text-sm font-normal text-foreground-400">
                    37 ngõ 73 Giang Văn Minh, Đội Cấn, Ba Đình, Hà Nội
                  </span>
                </div>
                {/* Destination */}
                <div className="col-span-full flex items-center gap-2">
                  <Flag
                    variant="Bold"
                    className="flex-none size-5 text-foreground-500"
                  />
                  <span className="flex-1 truncate text-sm font-normal text-foreground-400">
                    91 Chùa Láng, Láng Thượng, Đống Đa, Hà Nội
                  </span>
                </div>
                {/* Fare */}
                <div className="col-span-full flex items-center gap-2 justify-self-center">
                  <Money4
                    variant="Bold"
                    className="flex-none size-5 text-[#F59E0B]"
                  />
                  <span className="flex-1 truncate text-sm font-medium text-[#F59E0B]">
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
                  <div className="flex items-center gap-4">
                    <figure className="flex-none size-[60px] rounded-full bg-background-800 overflow-hidden">
                      <img
                        src={driverPfp}
                        alt="driver profile picture"
                        className="size-full object-contain"
                      />
                    </figure>
                    <div className="space-y-2">
                      <p className="max-w-[260px] truncate text-base font-medium text-white">
                        Dương Văn Hùng
                      </p>
                      <div className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-4 text-[#F59E0B]"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm font-normal text-[#F59E0B]">
                          4.9
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button intent="secondary" size="small">
                    <MessageText1 variant="Bold" />
                    Nhắn tin
                  </Button>
                </div>
                <div className="w-full flex items-center gap-8">
                  <div className="flex-none w-[24%] space-y-1">
                    <p className="text-xs font-normal text-foreground-600">
                      Phương tiện
                    </p>
                    <p className="text-sm font-medium text-foreground-300 truncate">
                      Mercedes-Benz C200
                    </p>
                  </div>
                  <div className="flex-none w-[15%] space-y-1">
                    <p className="text-xs font-normal text-foreground-600">
                      Biển kiểm soát
                    </p>
                    <p className="text-sm font-medium text-foreground-300 truncate">
                      29-B1 993.83
                    </p>
                  </div>
                  <figure className="flex-none w-[60px] h-[30px]">
                    <img
                      src={mercedesBenzC200}
                      alt="car picture"
                      className="size-full object-contain"
                    />
                  </figure>
                </div>
              </motion.div>
            ) : (
              <div key="empty_driver_info" className="space-y-2 mx-auto w-fit">
                <figure>
                  <img
                    src={emptyDriverInfoIllustrator}
                    alt="empty driver info illustrator"
                    className="w-[120px] h-[96px] object-contain"
                  />
                </figure>
                <p className="text-xs font-normal text-foreground-600 text-center">
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
