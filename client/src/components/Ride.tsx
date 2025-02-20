import React from "react";
import { useParams } from "react-router";
import { PageTitle } from "./ui/page-title";
import { Button } from "./ui/button";
import { DirectRight, Location, Flag } from "iconsax-react";
import { StaticMap, WebMercatorViewport } from "@goongmaps/goong-map-react";

import { AnimatePresence, motion } from "motion/react";
import { Marker } from "@/components/Marker";
import axios from "axios";
import { MotionDirectionInfo } from "./DirectionInfo";
import { RouteLine } from "./RouteLine";
import useMeasure from "react-use-measure";
import { useMediaQuery } from "react-responsive";
import { cn } from "@/utils/styling";
import { formatDate, timeFormatter } from "@/utils/datetime";
import { GGMAPS_API_KEY, GGMAPS_MAPTILES_KEY } from "@/config/keys";
import { GGMAPS_URL } from "@/config/urls";
import { PlaceDetail } from "@/types/placeDetail";
import { Route } from "@/types/route";
import { MotionRideSummary } from "./RideSummary";
import {
  DirectionRequestParams,
  DirectionServiceResponse,
} from "@/types/direction";
import { Dimensions, ScreenDefault, ScreenMD, ScreenXL } from "./ui/screen";
import { z } from "zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { VisuallyHidden } from "./ui/visually-hidden";
import { Field } from "./ui/field";
import { RadioGroupField, RadioItem } from "./ui/radio-group-field";
import { TextareaField } from "./ui/textarea-field";

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
  const { rideId } = useParams();

  return (
    // Main
    <main className="w-full pl-16 xl:pl-0 xl:pt-10 lg:pt-8 sm:pt-6">
      {/* Wrapper */}
      <div className="ml-auto w-full h-full max-w-[1800px] grid grid-cols-[43%,minmax(0,1fr)] xl:grid-cols-1">
        {/* Title (MD and below) */}
        <div className="hidden md:block w-full md:px-6 sm:px-4 space-y-1">
          <PageTitle
            classNames={{
              text: "md:text-2xl sm:text-lg",
              dot: "md:size-[6px] sm:size-1 md:translate-y-5 sm:translate-y-4",
            }}
          >
            Cuốc xe của bạn
          </PageTitle>
          <p className="font-normal md:text-sm sm:text-xs text-foreground-600">
            ID #{rideId}
          </p>
        </div>
        {/* Updates Section */}
        <UpdatesSection />
        {/* Map Section */}
        <MapSection />
      </div>
    </main>
  );
}

function UpdatesSection(): React.JSX.Element {
  const { rideId } = useParams();
  const isSM = useMediaQuery({ maxWidth: Dimensions.SM.max });
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "tween", duration: 0.3, ease: "easeIn" }}
      className="relative z-10 pt-16 lg:pt-10 pb-12 lg:pb-10 md:py-10 sm:py-8 xl:px-16 lg:px-10 md:px-6 sm:px-4 grid gap-16 sm:gap-10 grid-rows-[repeat(2,min-content),minmax(0,1fr)] xl:grid-rows-[min-content,minmax(0,1fr)] xl:row-start-2 md:row-start-3"
    >
      {/* Title */}
      <div className="w-full space-y-2 xl:hidden">
        <PageTitle>Cuốc xe của bạn</PageTitle>
        <p className="text-base font-normal text-foreground-600">
          ID #{rideId}
        </p>
      </div>
      {/* Updates */}
      <motion.div
        initial={{ opacity: 0, x: "-50%" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", duration: 1, delay: 0.5 }}
        className="w-full space-y-10 sm:space-y-5 xl:max-w-[750px] xl:justify-self-center"
      >
        <h2 className="w-full text-lg sm:text-base font-medium text-white">
          Cập nhật mới nhất
        </h2>
        {/* List */}
        <ul className="relative w-full space-y-8 sm:space-y-5">
          <div className="absolute w-px h-[calc(100%-32px)] sm:h-[calc(100%-30px)] bottom-1 sm:bottom-0 left-4 sm:left-3 border-r-divider border-r border-dashed" />
          {updates.map((update, i) => {
            const isHighlight = i === 0 && !update.isRead;
            return (
              <li key={update.id} className="w-full flex gap-8">
                {/* Icon */}
                <div
                  className={cn(
                    "flex-none size-8 sm:size-6 rounded-full flex items-center justify-center -translate-y-1 sm:translate-y-1",
                    isHighlight ? "bg-primary-flat" : "bg-background-900"
                  )}
                >
                  <StatusIcon
                    status={update.status}
                    className={cn(
                      "size-1/2",
                      isHighlight ? "text-primary-500" : "text-foreground-600"
                    )}
                  />
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0 grid grid-cols-[repeat(2,minmax(0,max-content))] sm:grid-cols-1 gap-10 sm:gap-1">
                  <div className="flex gap-8 sm:gap-4">
                    <p className="text-base sm:text-xs font-normal text-foreground-600">
                      {formatDate(update.createdAt)}
                    </p>
                    <p className="text-base sm:text-xs font-normal text-foreground-600">
                      {timeFormatter.format(update.createdAt)}
                    </p>
                  </div>
                  <p
                    className={cn(
                      "text-base sm:text-sm font-normal",
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
      </motion.div>
      {/* Cancel Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          type: "tween",
          duration: 0.3,
          ease: "easeIn",
          delay: 1,
        }}
        className="self-end xl:justify-self-end sm:justify-self-stretch"
      >
        <Dialog open={true}>
          <Button
            intent="danger"
            className="w-[180px] sm:w-full h-[60px] sm:h-[56px]"
            size={isSM ? "small" : "default"}
          >
            Hủy cuốc xe
          </Button>
          <DialogContent
            aria-describedby={undefined}
            onInteractOutside={(e) => e.preventDefault()}
          >
            <VisuallyHidden asChild>
              <DialogTitle>Chọn lý do hủy cuốc xe</DialogTitle>
            </VisuallyHidden>
            <CancelModal />
          </DialogContent>
        </Dialog>
      </motion.div>
    </motion.section>
  );
}

const pickupDetail: PlaceDetail = {
  place_id:
    "srd0DE7cDlJyuE1fqGq15WaqVgd-e5eZsoKtWNVJkl9l83nk-sboM-mbdPQCsk-WbfKtSO6yYm5h9eTwWqCKD83JXdKitGOHTf7tNWZtrm_J-gV4NrQ2Lm3ypViabDODb",
  formatted_address: "Ngõ 133 Thái Hà, Trung Liệt, Đống Đa, Hà Nội",
  geometry: {
    location: {
      lat: 21.0127586506918,
      lng: 105.818695042825,
    },
  },
  compound: {
    district: "Đống Đa",
    province: "Hà Nội",
  },
  name: "Ngõ 133 Thái Hà",
};

const destinationDetail: PlaceDetail = {
  place_id:
    "OtItv3aq_dRCpEJRZqGm5nO4TRJlvrGVQ9IzGwC_n991qE0WZJHv6nXTcRJZQoj9Y4sDCnWmnO5Fp1krX5SU6nC4YFJdlJS1cLRCVmSi0ZRxjlEOCApSEnHOmWSkDou-U",
  formatted_address:
    "Đại học Ngoại thương (cơ sở 1), 91 Chùa Láng, Láng Thượng, Đống Đa, Hà Nội",
  geometry: {
    location: {
      lat: 21.023258776,
      lng: 105.805451453,
    },
  },
  compound: {
    district: "Đống Đa",
    province: "Hà Nội",
  },
  name: "FTU",
};

function MapSection(): React.JSX.Element {
  const { rideId } = useParams();
  const [route, setRoute] = React.useState<Route | null>(null);
  const hasRoute = route ? true : false;
  const [ref, bounds] = useMeasure();
  const [viewport, setViewport] = React.useState<{
    longitude: number;
    latitude: number;
    zoom: number;
  }>();
  const isQHD = useMediaQuery({ minWidth: Dimensions.QHD.min });
  const is4K = useMediaQuery({ minWidth: Dimensions["4K"].min });
  const is8K = useMediaQuery({ minWidth: Dimensions["8K"].min });
  const isXL = useMediaQuery({ maxWidth: Dimensions.XL.max });
  const isSM = useMediaQuery({ maxWidth: Dimensions.SM.max });

  const padding = React.useMemo(() => {
    if (is8K)
      return {
        top: 1000,
        bottom: 1200,
        left: 600,
        right: 600,
      };

    if (is4K)
      return {
        top: 500,
        bottom: 600,
        left: 300,
        right: 300,
      };

    if (isQHD)
      return {
        top: 332.5,
        bottom: 399,
        left: 199.5,
        right: 199.5,
      };

    if (isSM) return { top: 100, bottom: 200, right: 60, left: 60 };
    if (isXL) return { top: 250, bottom: 300, right: 150, left: 150 };

    return {
      top: 250,
      bottom: 300,
      left: 150,
      right: 150,
    };
  }, [isQHD, is4K, is8K]);

  React.useEffect(() => {
    if (bounds.width === 0 || bounds.height === 0) return;

    const { longitude, latitude, zoom } = new WebMercatorViewport({
      width: bounds.width,
      height: bounds.height,
    }).fitBounds(
      [
        [
          pickupDetail.geometry.location.lng,
          pickupDetail.geometry.location.lat,
        ],
        [
          destinationDetail.geometry.location.lng,
          destinationDetail.geometry.location.lat,
        ],
      ],
      {
        padding,
        offset: [0, 0],
      }
    );
    setViewport({ latitude, longitude, zoom });
  }, [bounds.width, bounds.height, isQHD, is4K, is8K]);

  React.useEffect(() => {
    let ignoreDirection = false;
    const directionRequestParams: DirectionRequestParams = {
      origin: `${pickupDetail.geometry.location.lat},${pickupDetail.geometry.location.lng}`,
      destination: `${destinationDetail.geometry.location.lat},${destinationDetail.geometry.location.lng}`,
      vehicle: "car",
      api_key: GGMAPS_API_KEY,
    };
    axios
      .get<DirectionServiceResponse>(GGMAPS_URL + "/Direction", {
        params: directionRequestParams,
      })
      .then((res) => {
        const { routes, geocoded_waypoints } = res.data;
        let isOK = geocoded_waypoints.every(
          (waypoint) => waypoint.geocoder_status === "OK"
        );
        if (!isOK || ignoreDirection || !routes[0]) return;
        setRoute(routes[0]);
      })
      .catch((err) => console.error(err));

    return () => {
      ignoreDirection = true;
    };
  }, []);

  console.log("re-rendered");

  return (
    <section
      ref={ref}
      className="relative z-0 min-h-[930px] lg:min-h-[850px] sm:min-h-[550px] overflow-y-hidden -ml-8 xl:ml-0"
    >
      {/* Vertical Overlay */}
      <div className="absolute z-10 inset-0 bg-[linear-gradient(180deg,rgba(39,42,55,1)0%,rgba(39,42,55,1)10%,rgba(39,42,55,0)50%,rgba(39,42,55,1)85%,rgba(39,42,55,1)100%)] xl:bg-[linear-gradient(180deg,rgba(39,42,55,1)0%,rgba(39,42,55,1)10%,rgba(39,42,55,0)50%,rgba(39,42,55,0.9)80%,rgba(39,42,55,1)100%)] sm:bg-[linear-gradient(rgba(39,42,55,1)0%,rgba(39,42,55,1)10%,rgba(39,42,55,0)50%,rgba(39,42,55,1)80%,rgba(39,42,55,1)100%)]" />
      {/* Horizontal Overlay */}
      <div className="absolute z-10 inset-0 bg-[linear-gradient(90deg,rgba(39,42,55,1)0%,rgba(39,42,55,0.1)40%)] xl:bg-[linear-gradient(90deg,rgba(39,42,55,0.4)0%,rgba(39,42,55,0.2)50%,rgba(39,42,55,0.4)100%)]" />
      {/* Title (XL and LG only) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "tween", duration: 0.3, ease: "easeIn" }}
        className="hidden xl:block md:hidden absolute z-20 top-10 left-10 lg:left-8 w-max space-y-2"
      >
        <PageTitle
          classNames={{
            root: "lg:gap-1",
            text: "lg:text-2xl",
            dot: "lg:size-[6px] lg:translate-y-5",
          }}
        >
          Cuốc xe của bạn
        </PageTitle>
        <p className="text-base lg:text-sm font-normal text-foreground-600">
          ID #{rideId}
        </p>
      </motion.div>
      {/* Map */}
      {viewport && (
        <StaticMap
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          zoom={viewport.zoom}
          width="100%"
          height="100%"
          mapStyle="https://tiles.goong.io/assets/goong_map_dark.json"
          goongApiAccessToken={GGMAPS_MAPTILES_KEY}
        >
          <Marker locationType="Pickup" placeDetail={pickupDetail} />
          <Marker locationType="Destination" placeDetail={destinationDetail} />
          {hasRoute && <RouteLine route={route} />}
        </StaticMap>
      )}
      {/* Direction Info */}
      <ScreenDefault>
        <MotionDirectionInfo
          initial={{ opacity: 0, y: "-100%", x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          transition={{ type: "spring", duration: 1, delay: 1 }}
          className="absolute w-max z-20 top-10 xl:top-8 left-1/2 xl:left-auto xl:right-10"
          distanceText="3,750m"
          durationText="15 phút"
        />
      </ScreenDefault>
      <ScreenXL from="LG">
        <MotionDirectionInfo
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", duration: 1, delay: 1 }}
          className="absolute w-max z-20 top-10 right-6"
          distanceText="3,750m"
          durationText="15 phút"
        />
      </ScreenXL>
      <ScreenMD>
        <MotionDirectionInfo
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: "-50%" }}
          transition={{ type: "spring", duration: 1, delay: 1 }}
          className="absolute w-max z-20 top-10 sm:top-4 left-1/2"
          distanceText="3,750m"
          durationText="15 phút"
        />
      </ScreenMD>
      {/* Summary */}
      <ScreenDefault>
        <MotionRideSummary
          initial={{ opacity: 0, y: "100%", x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          transition={{ type: "spring", duration: 1, delay: 0.5 }}
        />
      </ScreenDefault>
      <ScreenXL from="LG">
        <MotionRideSummary
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          transition={{ type: "spring", duration: 1, delay: 1 }}
        />
      </ScreenXL>
      <ScreenMD>
        <MotionRideSummary
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          transition={{ type: "spring", duration: 1, delay: 1 }}
          className="md:max-w-[calc(100%-2*24px)] sm:max-w-[calc(100%-2*16px)] sm:bottom-4"
        />
      </ScreenMD>
    </section>
  );
}

const CancelFormSchema = z.object({
  reason: z.enum(["change_info", "cancel_plan", "wait_too_long", "other"], {
    required_error: "Bạn chưa chọn lý do hủy",
  }),
  note: z.string().optional(),
});

type CancelFormValues = z.infer<typeof CancelFormSchema>;

const radioItems: RadioItem[] = [
  {
    label: "Tôi muốn thay đổi thông tin",
    value: "change_info",
  },
  {
    label: "Tôi thay đổi kế hoạch không muốn đi nữa",
    value: "cancel_plan",
  },
  {
    label: "Tôi chờ đợi xe quá lâu",
    value: "wait_too_long",
  },
  {
    label: "Lý do khác (nếu có)",
    value: "other",
  },
];

function CancelModal(): React.JSX.Element {
  const methods = useForm<CancelFormValues>({
    resolver: zodResolver(CancelFormSchema),
    defaultValues: {
      note: "",
    },
  });

  const onValid = (data: CancelFormValues) => {
    console.log(data);
  };

  const reason = methods.watch("reason");

  React.useEffect(() => {
    if (reason !== "other") methods.resetField("note");
  }, [reason]);

  return (
    <div className="w-[500px] bg-background-950 rounded-4xl p-8 overflow-hidden">
      <div className="w-full space-y-8">
        <div className="w-full space-y-6">
          <p className="text-sm font-medium text-foreground-600">
            Vui lòng chọn lý do bạn muốn hủy cuốc xe
          </p>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onValid)} className="w-full">
              <Field<CancelFormValues>
                control={methods.control}
                name="reason"
                size={"default"}
              >
                <RadioGroupField
                  items={radioItems}
                  classNames={{ group: "space-y-5" }}
                />
              </Field>
              <AnimatePresence>
                {reason === "other" && (
                  <motion.div
                    key="note"
                    initial={{ opacity: 0, y: "-10%" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      y: "-10%",
                      transition: { duration: 0.1 },
                    }}
                    transition={{
                      type: "tween",
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                  >
                    <Field<CancelFormValues>
                      control={methods.control}
                      name="note"
                      size="default"
                    >
                      <TextareaField
                        placeholder="Nhập lý do tại đây..."
                        className="mt-4"
                        classNames={{ textArea: "h-[120px] resize-none" }}
                      />
                    </Field>
                  </motion.div>
                )}
              </AnimatePresence>
              <Button intent="danger" className="w-full py-0 h-16 mt-8">
                Xác nhận hủy
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
