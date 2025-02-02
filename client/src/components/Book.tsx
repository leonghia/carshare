import React from "react";
import logo from "../assets/images/logo.svg";
import { Link, NavLink } from "react-router";
import {
  Notification,
  HambergerMenu,
  Money4,
  Calendar,
  SmartCar,
  Location,
  People,
  Flag,
  Routing,
} from "iconsax-react";
import pfp from "../assets/images/user_pfp.webp";
import { useMediaQuery } from "react-responsive";
import { z } from "zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "./ui/field";
import { Button } from "./ui/button";
import { CheckboxField } from "./ui/checkboxField";
import { DatetimeField } from "./ui/datetimeField";
import { QuantityField } from "./ui/quantityField";
import { cn } from "@/lib/utils";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { RadioGroup } from "./ui/radio-group";
import carshareBasicIllustrator from "../assets/images/carshare_basic_illustrator.webp";
import carsharePremiumIllustrator from "../assets/images/carshare_premium_illustrator.webp";
import carshareExtraIllustrator from "../assets/images/carshare_extra_illustrator.webp";
import { FieldLower } from "./ui/fieldLower";
import { AnimatePresence, motion } from "motion/react";
import { cva } from "class-variance-authority";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { VisuallyHidden } from "./ui/visuallyHidden";
import { create } from "zustand";
import { AutoCompleteField, Item } from "./ui/autoCompleteField";
import { useDebounceValue } from "usehooks-ts";
import axios from "axios";
import ReactMapGL, {
  Marker,
  MapRef,
  WebMercatorViewport,
  Source,
  Layer,
} from "@goongmaps/goong-map-react";
import { easeCubic } from "d3-ease";
import { Hourglass } from "lucide-react";
import polyline from "@mapbox/polyline";

const GGMAPS_API_KEY = import.meta.env.VITE_GGMAPS_API_KEY;
const GGMAPS_MAPTILES_KEY = import.meta.env.VITE_GGMAPS_MAPTILES_KEY;
const GGMAPS_URL = import.meta.env.VITE_GGMAPS_URL;

type BookStoreState = {
  searchFieldValues: SearchFieldValues | null;
  serviceFieldValues: ServiceFieldValues | null;
  currentStep: Step;
  stepDirection: -1 | 1;
  destinationDetail: PlaceDetail | null;
  pickupDetail: PlaceDetail | null;
  hasBothLocationsEver: boolean;
  route: Route | null;
};

type BookStoreActions = {
  updateSearchFieldValues: (newValues: SearchFieldValues | null) => void;
  updateServiceFieldValues: (newValues: ServiceFieldValues | null) => void;
  updateCurrentStep: (newStep: Step) => void;
  updateStepDirection: (newStepDirection: -1 | 1) => void;
  updateDestinationDetail: (newDestinationDetail: PlaceDetail | null) => void;
  updatePickupDetail: (newPickupDetail: PlaceDetail | null) => void;
  updateRoute: (newRoute: Route | null) => void;
};

type BookStore = BookStoreState & BookStoreActions;

const useBookStore = create<BookStore>()((set) => ({
  route: null,
  hasBothLocationsEver: false,
  destinationDetail: null,
  pickupDetail: null,
  stepDirection: 1,
  currentStep: "search",
  searchFieldValues: null,
  serviceFieldValues: null,
  updateSearchFieldValues: (newValues) =>
    set(
      (state) => ({
        ...state,
        searchFieldValues: newValues,
      }),
      true
    ),

  updateServiceFieldValues: (newValues) =>
    set(
      (state) => ({
        ...state,
        serviceFieldValues: newValues,
      }),
      true
    ),
  updateCurrentStep: (newStep) =>
    set(
      (state) => ({
        ...state,
        currentStep: newStep,
      }),
      true
    ),
  updateStepDirection: (newStepDirection) =>
    set(
      (state) => ({
        ...state,
        stepDirection: newStepDirection,
      }),
      true
    ),
  updateDestinationDetail: (newDestinationDetail) => {
    set((state) => {
      if (!newDestinationDetail && !state.pickupDetail)
        return {
          ...state,
          destinationDetail: newDestinationDetail,
          hasBothLocationsEver: false,
        };
      if (newDestinationDetail && state.pickupDetail)
        return {
          ...state,
          destinationDetail: newDestinationDetail,
          hasBothLocationsEver: true,
        };
      return { ...state, destinationDetail: newDestinationDetail };
    }, true);
  },
  updatePickupDetail: (newPickupDetail) => {
    set((state) => {
      if (!newPickupDetail && !state.destinationDetail)
        return {
          ...state,
          pickupDetail: newPickupDetail,
          hasBothLocationsEver: false,
        };
      if (newPickupDetail && state.destinationDetail)
        return {
          ...state,
          pickupDetail: newPickupDetail,
          hasBothLocationsEver: true,
        };
      return { ...state, pickupDetail: newPickupDetail };
    }, true);
  },
  updateRoute: (newRoute) => {
    set((state) => ({ ...state, route: newRoute }), true);
  },
}));

const dateFormatter = new Intl.DateTimeFormat("vi-VN", {
  dateStyle: "short",
});

const timeFormatter = new Intl.DateTimeFormat("vi-VN", {
  timeStyle: "short",
});

const moneyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

type Step = "search" | "service" | "summary";

const stepVariants = cva<{ step: Record<Step, string> }>(
  "w-full xl:mx-auto sm:max-w-[420px]",
  {
    variants: {
      step: {
        search: "max-w-[450px] xl:max-w-[800px] md:max-w-[580px]",
        service: "max-w-[500px] xl:max-w-[520px]",
        summary: "max-w-[500px] xl:max-w-[520px]",
      },
    },
  }
);

export function Book(): React.JSX.Element {
  return (
    <div className="w-full min-h-screen bg-background-950 grid grid-rows-[max-content,minmax(0,1fr)]">
      {/* Header */}
      <header className="w-full px-16 lg:px-6 sm:px-4 pt-8 lg:pt-6 sm:pt-4 grid grid-cols-[repeat(3,max-content)] lg:grid-cols-[repeat(2,max-content)] items-center justify-between">
        {/* Hamburger button & Logo */}
        <div className="flex items-center gap-4 sm:gap-3">
          <button type="button" className="hidden lg:block">
            <HambergerMenu
              variant="Bold"
              className="size-8 sm:size-6 text-foreground-500"
            />
          </button>
          <Link to="/">
            <img
              src={logo}
              alt="carshare logo"
              className="h-8 sm:h-5 object-cover"
            />
          </Link>
        </div>
        {/* Navbar */}
        <nav className="w-[500px] xl:w-[450px] lg:hidden flex items-center justify-between">
          <NavLink
            to="/book"
            className="text-lg font-medium text-foreground-500 [&.active]:text-white"
          >
            Đặt xe
          </NavLink>
          <NavLink
            to="/rules"
            className="text-lg font-medium text-foreground-500 [&.active]:text-white"
          >
            Quy định
          </NavLink>
          <NavLink
            to="/feedback"
            className="text-lg font-medium text-foreground-500 [&.active]:text-white"
          >
            Phản ánh
          </NavLink>
        </nav>
        {/* Right */}
        <div className="flex items-center gap-10 sm:gap-6">
          <button type="button" className="relative">
            <Notification
              variant="Bold"
              className="size-8 sm:size-6 text-foreground-500"
            />
            <span className="block absolute top-0 right-0 size-3 sm:size-2 rounded-full bg-danger-500 border-2 sm:border border-white"></span>
          </button>
          <button type="button">
            <img
              src={pfp}
              alt="user profile picture"
              className="size-10 sm:size-[30px] rounded-full border-2 sm:border border-primary-500 shadow-xl sm:shadow-md"
            />
          </button>
        </div>
      </header>
      {/* Main */}
      <main className="w-full pl-16 xl:pl-0 xl:pt-16 lg:pt-12 sm:pt-8 grid justify-items-end xl:justify-items-center">
        {/* Inner */}
        <div className="w-full h-full max-w-[1800px] grid grid-cols-[max-content,minmax(0,1fr)] xl:grid-cols-1 xl:grid-rows-[max-content,minmax(0,1fr)]">
          {/* Left Section */}
          <LeftSection className="relative z-10 h-full pt-[120px] 2xl:pt-16 xl:pt-0 grid auto-rows-min lg:px-8 sm:px-4 w-[500px] xl:w-full space-y-12 lg:space-y-10 sm:space-y-6 xl:justify-items-center" />
          {/* Right Section */}
          <RightSection className="h-full relative z-0 min-h-[900px] 2xl:min-h-[800px] xl:min-h-[700px] lg:min-h-[600px] md:min-h-[550px] sm:min-h-[450px]" />
        </div>
      </main>
    </div>
  );
}

function CustomMarker({
  locationType,
}: {
  locationType: "Destination" | "Pickup";
}): React.JSX.Element | null {
  const isSM = useMediaQuery({ maxWidth: 639 });

  const placeDetail = useBookStore((state) =>
    locationType === "Destination"
      ? state.destinationDetail
      : state.pickupDetail
  );

  if (!placeDetail?.geometry || !placeDetail.compound) return null;
  return (
    <Marker
      latitude={placeDetail.geometry.location.lat}
      longitude={placeDetail.geometry.location.lng}
      offsetLeft={isSM ? -16 : -24}
      offsetTop={isSM ? -16 : -24}
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
        <div className="absolute left-0 top-0 -translate-y-[calc(100%+12px)] sm:-translate-y-[calc(100%+8px)] -translate-x-[calc(50%-24px)] sm:-translate-x-[calc(50%-20px)] w-max max-w-[260px] sm:max-w-[200px] bg-background-950 border-2 border-divider rounded-2xl sm:rounded-xl p-4 sm:px-3 sm:py-2">
          <div className="w-full flex items-center gap-3 sm:gap-2">
            {isSM &&
              (locationType === "Destination" ? (
                <Flag variant="Bold" className="size-5 text-[#22C55E]" />
              ) : (
                <Location variant="Bold" className="size-5 text-[#EF4444]" />
              ))}
            {!isSM && (
              <div
                className={cn(
                  "flex flex-none size-10 sm:size-[34px] rounded-full items-center justify-center",
                  locationType === "Destination"
                    ? "bg-[#22C55E]/15"
                    : "bg-[#EF4444]/15"
                )}
              >
                {locationType === "Destination" ? (
                  <Flag
                    variant="Bold"
                    className="size-5 sm:size-4 text-[#22C55E]"
                  />
                ) : (
                  <Location
                    variant="Bold"
                    className="size-5 sm:size-4 text-[#EF4444]"
                  />
                )}
              </div>
            )}
            <div className="flex-1 min-w-0 space-y-2 sm:space-y-1">
              <p className="text-xs sm:text-xxs font-normal text-foreground-500 w-full truncate">
                {placeDetail.compound.district}, {placeDetail.compound.province}
              </p>
              <p className="text-sm sm:text-xs font-normal text-white w-full truncate">
                {placeDetail.name}
              </p>
            </div>
          </div>
        </div>
        <motion.div
          animate={{ scale: [1.2, 1, 1.25] }}
          transition={{
            type: "tween",
            ease: "linear",
            repeat: Infinity,
            duration: 0.7,
          }}
          className="mx-auto size-12 sm:size-8 rounded-full bg-[#1D90F5]/40 shadow-xl flex items-center justify-center"
        >
          <div className="size-5 sm:size-3 rounded-full bg-primary-500"></div>
        </motion.div>
      </motion.div>
    </Marker>
  );
}

interface DirectionRequestParams {
  origin: string;
  destination: string;
  vehicle: "car";
  api_key: string;
}

function RightSection({
  className,
}: React.ComponentPropsWithRef<"section">): React.JSX.Element {
  const route = useBookStore((state) => state.route);
  const hasRoute = route ? true : false;
  const updateRoute = useBookStore((state) => state.updateRoute);
  const hasBothLocationsEver = useBookStore(
    (state) => state.hasBothLocationsEver
  );
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const mapRef = React.useRef<MapRef>(null);
  const is8K = useMediaQuery({ minWidth: 7680 });
  const is4K = useMediaQuery({ minWidth: 3840 });
  const isQHD = useMediaQuery({ minWidth: 2560 });
  const is2XL = useMediaQuery({ maxWidth: 1535 });
  const isXL = useMediaQuery({ maxWidth: 1279 });
  const isSM = useMediaQuery({ maxWidth: 639 });

  const zoom: number = React.useMemo(() => {
    let temp = 13;
    if (is2XL) temp = 12;
    if (is4K) temp = 14;
    if (is8K) temp = 16;
    return temp;
  }, [is2XL, is4K, is8K]);

  const [viewport, setViewport] = React.useState({
    width: 0,
    height: 0,
    latitude: 21.02686595596347,
    longitude: 105.85375738102857,
    zoom,
  });

  const destinationDetail = useBookStore((state) => state.destinationDetail);
  const pickupDetail = useBookStore((state) => state.pickupDetail);

  const mapInlineStyles: React.CSSProperties = React.useMemo(() => {
    let styles: React.CSSProperties = { marginLeft: "auto" };
    if (isXL) styles.marginLeft = 0;
    return styles;
  }, [isXL]);

  React.useEffect(() => {
    if (!destinationDetail || !pickupDetail) updateRoute(null);
    if (destinationDetail && !pickupDetail && !hasBothLocationsEver) {
      setIsTransitioning(true);
      mapRef.current?.getMap().flyTo({
        center: [
          destinationDetail.geometry.location.lng,
          destinationDetail.geometry.location.lat,
        ],
        zoom,
        duration: 1500,
        easing: easeCubic,
      });
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("foo");
        }, 1600);
      }).then((_) => {
        setViewport({
          ...viewport,
          longitude: destinationDetail.geometry.location.lng,
          latitude: destinationDetail.geometry.location.lat,
          zoom,
        });
        setIsTransitioning(false);
      });
    }

    if (pickupDetail && !destinationDetail && !hasBothLocationsEver) {
      setIsTransitioning(true);
      mapRef.current?.getMap().flyTo({
        center: [
          pickupDetail.geometry.location.lng,
          pickupDetail.geometry.location.lat,
        ],
        zoom,
        duration: 1500,
        easing: easeCubic,
      });
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("foo");
        }, 1600);
      }).then((_) => {
        setViewport({
          ...viewport,
          longitude: pickupDetail.geometry.location.lng,
          latitude: pickupDetail.geometry.location.lat,
          zoom,
        });
        setIsTransitioning(false);
      });
    }

    let ignoreDirection = false;
    if (destinationDetail && pickupDetail) {
      let padding = {
        top: 200,
        left: 180,
        right: 160,
        bottom: 200,
      };

      if (isQHD)
        padding = {
          top: 266,
          left: 239,
          right: 213,
          bottom: 266,
        };
      if (is4K)
        padding = {
          top: 400,
          left: 360,
          right: 320,
          bottom: 400,
        };
      if (is8K)
        padding = {
          top: 800,
          left: 720,
          right: 640,
          bottom: 800,
        };
      if (isXL)
        padding = {
          top: 200,
          left: 160,
          right: 160,
          bottom: 200,
        };
      if (isSM) padding = { top: 80, left: 100, right: 100, bottom: 80 };
      setIsTransitioning(true);
      const { longitude, latitude, zoom } = new WebMercatorViewport(
        viewport
      ).fitBounds(
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
      mapRef.current?.getMap().flyTo({
        center: [longitude, latitude],
        zoom,
        duration: 1500,
        easing: easeCubic,
      });
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("foo");
        }, 1600);
      }).then((_) => {
        setViewport({
          ...viewport,
          longitude,
          latitude,
          zoom,
        });
        setIsTransitioning(false);
      });
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
          updateRoute(routes[0]);
        })
        .catch((err) => console.error(err));
    }
    return () => {
      ignoreDirection = true;
    };
  }, [destinationDetail?.place_id, pickupDetail?.place_id]);

  console.log("map re-rendered");

  const directionSource = React.useMemo(() => {
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
  }, [hasRoute]);

  return (
    <section className={cn("relative overflow-hidden", className)}>
      {/* Vertical gradient */}
      <div className="absolute z-10 inset-0 bg-[linear-gradient(180deg,rgba(39,42,55,1)0%,rgba(39,42,55,0)30%)]"></div>
      {/* Horizontal gradient */}
      <div className="absolute z-10 inset-0 bg-[linear-gradient(90deg,rgba(39,42,55,1)0%,rgba(39,42,55,0.5)50%,rgba(39,42,55,0.5)100%)] xl:bg-[linear-gradient(90deg,rgba(39,42,55,0.5)0%,rgba(39,42,55,0.5)50%,rgba(39,42,55,0.5)100%)]"></div>
      {/* Actual map */}
      <ReactMapGL
        ref={mapRef}
        {...viewport}
        onViewportChange={setViewport}
        width="100%"
        height="100%"
        style={mapInlineStyles}
        mapStyle="https://tiles.goong.io/assets/goong_map_dark.json"
        goongApiAccessToken={GGMAPS_MAPTILES_KEY}
      >
        {!isTransitioning && <CustomMarker locationType="Destination" />}
        {!isTransitioning && <CustomMarker locationType="Pickup" />}
        {!isTransitioning && route && directionSource}
      </ReactMapGL>
      <AnimatePresence>
        {route && (
          <MotionDirectionInfo
            initial={{ opacity: 0, y: 100, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 100, x: "-50%", transition: { delay: 0 } }}
            transition={{ type: "spring", duration: 1, delay: 2 }}
            key="direction_info"
            className="absolute z-10 bottom-8 sm:bottom-4 left-1/2 w-max"
            distanceText={route.legs[0].distance.text}
            durationText={route.legs[0].duration.text}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

const SearchFormSchema = z
  .object({
    destination: z
      .string()
      .trim()
      .min(1, { message: "Điểm đến không được để trống" }),
    useCurrentLocation: z.boolean(),
    pickup: z
      .string()
      .trim()
      .min(1, { message: "Điểm đón không được để trống" }),
    departureTime: z.object({
      hour: z.string().trim(),
      minute: z.string().trim(),
      date: z.string().trim(),
      month: z.string().trim(),
      year: z.string().trim(),
    }),
    numbersOfPassengers: z
      .string()
      .trim()
      .min(1, { message: "Số lượng không được để trống" }),
  })
  .superRefine(({ departureTime }, ctx) => {
    if (
      departureTime.hour.length === 0 &&
      departureTime.minute.length === 0 &&
      departureTime.date.length === 0 &&
      departureTime.month.length === 0 &&
      departureTime.year.length === 0
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Thời gian không được để trống",
        path: ["departureTime"],
        fatal: true,
      });

      return z.NEVER;
    }

    const parseResult = z
      .string()
      .datetime({ local: true })
      .safeParse(
        `${departureTime.year}-${departureTime.month.padStart(
          2,
          "0"
        )}-${departureTime.date.padStart(2, "0")}T${departureTime.hour.padStart(
          2,
          "0"
        )}:${departureTime.minute.padStart(2, "0")}:00`
      );

    if (!parseResult.success) {
      ctx.addIssue({
        code: "invalid_date",
        message: "Thời gian không hợp lệ",
        path: ["departureTime"],
      });
    } else {
      const isLaterThanNow = new Date(parseResult.data).getTime() > Date.now();
      !isLaterThanNow &&
        ctx.addIssue({
          code: "invalid_date",
          message: "Thời gian phải ở tương lai",
          path: ["departureTime"],
        });
    }
  });

type SearchFieldValues = z.infer<typeof SearchFormSchema>;

const now = new Date();

interface SearchFormProps extends React.ComponentPropsWithRef<"form"> {}

function SearchForm({
  className,
  ...props
}: SearchFormProps): React.JSX.Element {
  const [isSearching, setIsSearching] = React.useState(false);
  const isSM = useMediaQuery({ maxWidth: 639 });
  const [revalidate, setRevalidate] = React.useState(false);
  const fieldValues = useBookStore((state) => state.searchFieldValues);
  const destinationDetail = useBookStore((state) => state.destinationDetail);
  const pickupDetail = useBookStore((state) => state.pickupDetail);

  const updateFieldValues = useBookStore(
    (state) => state.updateSearchFieldValues
  );
  const updateCurrentStep = useBookStore((state) => state.updateCurrentStep);
  const updateServiceFieldValues = useBookStore(
    (state) => state.updateServiceFieldValues
  );
  const updateDirection = useBookStore((state) => state.updateStepDirection);

  const methods = useForm<SearchFieldValues>({
    resolver: zodResolver(SearchFormSchema),
    defaultValues: {
      destination: "",
      pickup: "",
      departureTime: {
        hour: "",
        minute: "",
        date: "",
        month: "",
        year: "",
      },
      numbersOfPassengers: "",
      useCurrentLocation: false,
    },
    values: fieldValues
      ? {
          destination: fieldValues.destination,
          pickup: fieldValues.pickup,
          departureTime: {
            hour: fieldValues.departureTime.hour,
            minute: fieldValues.departureTime.minute,
            date: fieldValues.departureTime.date,
            month: fieldValues.departureTime.month,
            year: fieldValues.departureTime.year,
          },
          numbersOfPassengers: fieldValues.numbersOfPassengers,
          useCurrentLocation: fieldValues.useCurrentLocation,
        }
      : undefined,
    shouldFocusError: false,
    resetOptions: {
      keepDefaultValues: true,
    },
  });

  const onSubmit = async (data: SearchFieldValues) => {
    const addressNotFoundMessage = "Không tìm thấy địa chỉ này";
    if (!destinationDetail?.place_id) {
      methods.setError("destination", {
        type: "manual",
        message: addressNotFoundMessage,
      });
    }

    if (!pickupDetail?.place_id) {
      methods.setError("pickup", {
        type: "manual",
        message: addressNotFoundMessage,
      });
      return;
    }

    setIsSearching(true);
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("foo");
      }, 1000);
    });
    setIsSearching(false);
    updateFieldValues(data);
    updateServiceFieldValues(null);
    updateDirection(1);
    updateCurrentStep("service");
  };

  const onInvalid = () => {
    setRevalidate(true);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit, onInvalid)}
        className={cn(
          "w-full xl:max-w-[800px] space-y-10 sm:space-y-8",
          className
        )}
        {...props}
      >
        {/* Fields */}
        <div className="w-full grid gap-8 grid-cols-1 xl:grid-cols-[minmax(0,1fr),max-content] lg:grid-cols-[minmax(0,1fr),max-content] sm:grid-cols-1 sm:gap-5">
          <div className="space-y-4 sm:space-y-3 col-span-full xl:col-span-1 lg:col-span-1 md:col-span-full">
            <Field<SearchFieldValues>
              label="Điểm đón"
              required
              size={isSM ? "small" : "default"}
              name="pickup"
              control={methods.control}
            >
              <LocationField
                locationType="Pickup"
                onSelectLocation={() => methods.clearErrors("pickup")}
              />
            </Field>
            <Field<SearchFieldValues>
              label="Sử dụng vị trí hiện tại của tôi"
              size={isSM ? "small" : "default"}
              name="useCurrentLocation"
              control={methods.control}
            >
              <CheckboxField
                classNames={{
                  container: "items-center",
                  label: "text-sm font-normal text-foreground-200 sm:text-xs",
                }}
              />
            </Field>
          </div>
          <Field<SearchFieldValues>
            label="Điểm đến"
            required
            size={isSM ? "small" : "default"}
            name="destination"
            control={methods.control}
          >
            <LocationField
              locationType="Destination"
              onSelectLocation={() => methods.clearErrors("destination")}
            />
          </Field>
          <Field<SearchFieldValues>
            label="Thời gian khởi hành"
            required
            size={isSM ? "small" : "default"}
            name="departureTime"
            control={methods.control}
          >
            <DatetimeField
              invalidMessage="Thời gian không hợp lệ"
              requiredMessage="Thời gian khởi hành không được để trống"
              revalidate={revalidate}
              hourName="departureTime.hour"
              minuteName="departureTime.minute"
              dateName="departureTime.date"
              monthName="departureTime.month"
              yearName="departureTime.year"
              hourPlaceholder={String(now.getHours()).padStart(2, "0")}
              minutePlaceholder={String(now.getMinutes()).padStart(2, "0")}
              datePlaceholder={String(now.getDate()).padStart(2, "0")}
              monthPlaceholder={String(now.getMonth() + 1).padStart(2, "0")}
              yearPlaceholder={String(now.getFullYear())}
              classNames={{
                container:
                  "col-span-full xl:col-span-1 xl:row-start-1 xl:col-start-2 lg:col-span-1 lg:row-start-1 lg:col-start-2 md:col-start-1 md:row-start-3 sm:col-span-full",
                inner: "gap-8 sm:gap-10",
                upper: "w-fit md:w-full",
              }}
            />
          </Field>
          <Field<SearchFieldValues>
            label="Số lượng hành khách"
            required
            size={isSM ? "small" : "default"}
            name="numbersOfPassengers"
            control={methods.control}
          >
            <QuantityField
              max={20}
              min={0}
              placeholder="0"
              classNames={{
                container:
                  "col-span-full xl:col-start-2 xl:col-span-1 xl:row-start-2 lg:col-span-1 lg:row-start-2 lg:col-start-2 md:row-start-3 sm:col-span-full sm:row-start-4",
                left: "max-w-[200px] sm:max-w-[180px]",
              }}
            />
          </Field>
        </div>
        {/* Search button */}
        <Button
          hasLoader
          isLoading={isSearching}
          size={isSM ? "small" : "default"}
          type="submit"
          className="px-0 py-0 w-full h-[70px] xl:max-w-[360px] sm:max-w-full lg:w-[320px] xl:flex xl:mx-auto sm:w-full sm:h-[60px]"
        >
          Tìm cuốc xe
        </Button>
      </form>
    </FormProvider>
  );
}

interface ServiceResponse {
  status: "OK";
}

interface PlacesSearchServiceResponse extends ServiceResponse {
  predictions: PlaceAutoComplete[];
}

interface PlacesSearchRequestParams {
  api_key: string;
  location: string;
  limit: number;
  radius: number;
  input: string;
  more_compound: boolean;
}

interface PlaceDetailRequestParams {
  api_key: string;
  place_id: string;
}

interface PlaceAutoComplete {
  description: string;
  place_id: string;
}

interface PlaceDetailServiceResponse extends ServiceResponse {
  result: PlaceDetail;
}

interface Location {
  lat: number;
  lng: number;
}

interface PlaceDetail {
  place_id: string;
  formatted_address: string;
  geometry: { location: Location };
  name: string;
  compound: {
    district: string;
    province: string;
  };
}

function usePlacesSearch(
  query: string
): [
  PlaceAutoComplete[],
  React.Dispatch<React.SetStateAction<PlaceAutoComplete[]>>
] {
  const [places, setPlaces] = React.useState<PlaceAutoComplete[]>([]);

  React.useEffect(() => {
    let ignore = false;

    if (query.trim().length > 0) {
      const requestParams: PlacesSearchRequestParams = {
        api_key: GGMAPS_API_KEY,
        location: "21.026678444340764,105.8538045213328",
        limit: 10,
        radius: 50,
        input: query,
        more_compound: false,
      };
      axios
        .get<PlacesSearchServiceResponse>(GGMAPS_URL + "/Place/AutoComplete", {
          params: requestParams,
        })
        .then((res) => {
          if (res.data.status === "OK" && !ignore)
            setPlaces(res.data.predictions);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setPlaces([]);
    }

    return () => {
      ignore = true;
    };
  }, [query]);

  return [places, setPlaces];
}

function LocationField({
  locationType,
  onSelectLocation,
}: {
  locationType: "Destination" | "Pickup";
  onSelectLocation: () => void;
}): React.JSX.Element {
  const [isFetching, setIsFetching] = React.useState(false);
  const updatePlaceDetail = useBookStore((state) =>
    locationType === "Destination"
      ? state.updateDestinationDetail
      : state.updatePickupDetail
  );
  const fieldValues = useBookStore((state) => state.searchFieldValues);
  const stepDirection = useBookStore((state) => state.stepDirection);
  const value =
    locationType === "Destination"
      ? fieldValues?.destination
      : fieldValues?.pickup;
  const initialValue = stepDirection === 1 ? value || "" : "";
  const [debouncedQuery, setQuery] = useDebounceValue(initialValue, 1000);
  const [places, setPlaces] = usePlacesSearch(debouncedQuery);
  const items: Item[] = places.map((place) => ({
    id: place.place_id,
    content: place.description,
  }));

  const handleSelectLocation = (placeID: string) => {
    if (isFetching) return;
    setIsFetching(true);
    onSelectLocation();
    const requestParams: PlaceDetailRequestParams = {
      api_key: GGMAPS_API_KEY,
      place_id: placeID,
    };

    axios
      .get<PlaceDetailServiceResponse>(GGMAPS_URL + "/Place/Detail", {
        params: requestParams,
      })
      .then((res) => {
        if (res.data.status === "OK" && !isFetching)
          updatePlaceDetail(res.data.result);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  const handleClear = () => {
    setPlaces([]);
    updatePlaceDetail(null);
  };

  return (
    <AutoCompleteField
      inputProps={{
        type: "text",
        placeholder:
          locationType === "Destination"
            ? "Nhập địa chỉ bạn muốn đến..."
            : "Nhập địa chỉ để tài xế đón bạn",
      }}
      classNames={{
        container: "col-span-full xl:col-span-1 lg:col-span-1 md:col-span-full",
      }}
      onChange={(e) => setQuery(e.target.value)}
      items={items}
      onClear={handleClear}
      onSelectItem={handleSelectLocation}
    />
  );
}

const ServiceFormSchema = z.object({
  service: z.enum(["basic", "premium", "extra"], {
    message: "Vui lòng chọn dịch vụ trước khi tiếp tục",
  }),
});

type ServiceFieldValues = z.infer<typeof ServiceFormSchema>;

type ServiceName = ServiceFieldValues["service"];

type Service = {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
  value: ServiceFieldValues["service"];
};

const services: Service[] = [
  {
    id: 1,
    imageUrl: carshareBasicIllustrator,
    name: "Carshare Basic",
    description: "Dịch vụ cơ bản với dòng xe phổ thông, tiết kiệm chi phí",
    value: "basic",
  },
  {
    id: 2,
    imageUrl: carsharePremiumIllustrator,
    name: "Carshare Premium",
    description: "Dịch vụ cao cấp với dòng xe hạng sang tiện nghi, hiện đại",
    value: "premium",
  },
  {
    id: 3,
    imageUrl: carshareExtraIllustrator,
    name: "Carshare Extra",
    description: "Dòng xe cỡ lớn (7 - 16 chỗ) đủ sức chứa cho nhiều hành khách",
    value: "extra",
  },
];

const calculateFare = ({
  serviceName,
  distance,
  duration,
}: {
  serviceName: ServiceName;
  distance: number;
  duration: number;
}) => {
  const base_fare = 8000;
  let per_km_rate = 8000;
  let per_minute_rate = 2000;
  const surge_multiplier = 1;
  const service_fee = 2000;
  const discount = 0;
  const tax_rate = 0.1;
  if (serviceName === "extra") {
    per_km_rate = 10_000;
    per_minute_rate = 2500;
  }
  if (serviceName === "premium") {
    per_km_rate = 12_000;
    per_minute_rate = 3500;
  }
  const subtotal =
    base_fare +
    (distance * per_km_rate + duration * per_minute_rate) * surge_multiplier +
    service_fee -
    discount;
  const tax = subtotal * tax_rate;
  return subtotal + tax;
};

interface SelectServiceProps extends React.ComponentPropsWithoutRef<"div"> {}

const SelectService = React.forwardRef<HTMLDivElement, SelectServiceProps>(
  ({ className, ...props }, ref) => {
    const fieldValues = useBookStore((state) => state.serviceFieldValues);
    const updateFieldValues = useBookStore(
      (state) => state.updateServiceFieldValues
    );
    const destinationDetail = useBookStore((state) => state.destinationDetail);
    const pickupDetail = useBookStore((state) => state.pickupDetail);
    const updateCurrentStep = useBookStore((state) => state.updateCurrentStep);
    const updateDirection = useBookStore((state) => state.updateStepDirection);
    const route = useBookStore((state) => state.route);

    if (!destinationDetail || !pickupDetail)
      throw new Error("destination or pickup is null/undefined");

    const { place_id: destinationID } = destinationDetail;
    const { place_id: pickupID } = pickupDetail;

    const methods = useForm<ServiceFieldValues>({
      resolver: zodResolver(ServiceFormSchema),
      values: fieldValues
        ? {
            service: fieldValues.service,
          }
        : undefined,
    });
    const isSM = useMediaQuery({ maxWidth: 639 });
    const fares: Record<ServiceName, number> = React.useMemo(() => {
      if (!route) throw new Error("route is undefined or null");
      const distance = route.legs[0].distance.value / 1000;
      const duration = route.legs[0].duration.value / 60;
      const basic_fare = calculateFare({
        serviceName: "basic",
        distance,
        duration,
      });
      const premium_fare = calculateFare({
        serviceName: "premium",
        distance,
        duration,
      });
      const extra_fare = calculateFare({
        serviceName: "extra",
        distance,
        duration,
      });

      return { basic: basic_fare, premium: premium_fare, extra: extra_fare };
    }, [destinationID, pickupID]);

    const onValid = (data: ServiceFieldValues) => {
      updateFieldValues({
        service: data.service,
      });
      updateCurrentStep("summary");
      updateDirection(1);
    };

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <p className="w-full text-base sm:text-sm font-normal text-foreground-600">
          Vui lòng lựa chọn dịch vụ bạn muốn sử dụng:
        </p>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onValid)}
            className="w-full space-y-12 xl:space-y-10 sm:space-y-8 mt-8 sm:mt-6"
          >
            <Field control={methods.control} name="service">
              <Controller
                control={methods.control}
                name="service"
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="space-y-8 sm:space-y-6"
                  >
                    {services.map((service) => (
                      <RadioGroupPrimitive.Item
                        key={service.id}
                        value={service.value}
                        className="group block relative text-left w-full p-5 xl:px-6 sm:px-4 sm:py-3 bg-background-900 rounded-3xl sm:rounded-2xl data-[state=checked]:bg-[rgba(29,144,245,0.05)] data-[state=checked]:outline-none data-[state=checked]:ring-[6px] data-[state=checked]:ring-primary-flat data-[state=checked]:ring-offset-2 data-[state=checked]:ring-offset-primary-500 data-[state=unchecked]:hover:scale-105 transition-all duration-300 ease-out"
                      >
                        <div className="w-full grid grid-cols-[minmax(0,1fr),110px] sm:grid-cols-1 gap-6 sm:gap-2">
                          <div className="flex items-center gap-4 sm:gap-3">
                            <figure className="w-16 sm:w-[60px] flex-none">
                              <img
                                src={service.imageUrl}
                                alt={service.name}
                                className="size-16 sm:size-[60px] object-contain"
                              />
                            </figure>
                            <div className="flex-1 min-w-0 space-y-2 sm:space-y-1">
                              <h6 className="text-lg sm:text-base font-semibold text-white">
                                {service.name}
                              </h6>
                              <p className="text-base sm:text-sm font-normal text-foreground-500">
                                {service.description}
                              </p>
                            </div>
                          </div>
                          <div className="self-end grid grid-cols-1 sm:grid-cols-[max-content,minmax(0,1fr)] gap-1 sm:gap-8">
                            <div className="text-foreground-500 flex items-center gap-1 justify-end">
                              <Money4
                                variant="Bold"
                                className="size-[18px] sm:size-4"
                              />
                              <span className="text-sm sm:text-xs font-normal">
                                Cước phí{isSM && ":"}
                              </span>
                            </div>
                            <div className="text-base sm:text-sm font-medium text-[#F59E0B] text-right">
                              {moneyFormatter.format(fares[service.value])}
                            </div>
                          </div>
                        </div>
                        <div className="absolute size-4 sm:size-[14px] rounded-full bg-background-700 right-4 top-4 flex items-center justify-center group-data-[state=checked]:bg-transparent group-data-[state=checked]:border-2 group-data-[state=checked]:border-primary-500">
                          <span className="size-2 sm:size-[6px] rounded-full bg-transparent group-data-[state=checked]:bg-primary-500"></span>
                        </div>
                      </RadioGroupPrimitive.Item>
                    ))}
                  </RadioGroup>
                )}
              />
              <FieldLower />
            </Field>

            <Button
              type="submit"
              intent="primary"
              size={isSM ? "small" : "default"}
              className="flex ml-auto py-0 w-[280px] sm:w-full h-[70px] sm:h-[60px]"
            >
              Tiếp theo
            </Button>
          </form>
        </FormProvider>
      </div>
    );
  }
);

const serviceNameText: Record<ServiceFieldValues["service"], string> = {
  basic: "Carshare Basic",
  premium: "Carshare Premium",
  extra: "Carshare Extra",
};

interface SummaryProps extends React.ComponentPropsWithoutRef<"div"> {}

type Output = {
  departureTime: Date;
  service: string;
  destination: string;
  pickup: string;
  numbersOfPassengers: number;
  fare: number;
};

const Summary = React.forwardRef<HTMLDivElement, SummaryProps>(
  ({ className, ...props }, ref) => {
    const isSM = useMediaQuery({ maxWidth: 639 });
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const route = useBookStore((state) => state.route);
    const searchFieldValues = useBookStore((state) => state.searchFieldValues);
    const serviceFieldValues = useBookStore(
      (state) => state.serviceFieldValues
    );

    if (!searchFieldValues)
      throw new Error("searchFieldValues is undefined or null");
    if (!serviceFieldValues)
      throw new Error("serviceFieldValues is undefined or null");
    if (!route) throw new Error("route is undefined or null");

    const output: Output = {
      departureTime: new Date(
        Number(searchFieldValues.departureTime.year),
        Number(searchFieldValues.departureTime.month) - 1,
        Number(searchFieldValues.departureTime.date),
        Number(searchFieldValues.departureTime.hour),
        Number(searchFieldValues.departureTime.minute)
      ),
      service: serviceNameText[serviceFieldValues.service],
      destination: searchFieldValues.destination,
      pickup: searchFieldValues.pickup,
      numbersOfPassengers: Number(searchFieldValues.numbersOfPassengers),
      fare: calculateFare({
        serviceName: serviceFieldValues.service,
        distance: route.legs[0].distance.value / 1000,
        duration: route.legs[0].duration.value / 60,
      }),
    };

    const handleBook = React.useCallback(() => {
      setIsLoading(true);
      const timeout = setTimeout(() => {
        setIsLoading(false);
        setIsModalOpen(true);
        clearTimeout(timeout);
      }, 2000);
    }, []);

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <p className="w-full text-base sm:text-sm font-normal text-foreground-600">
          Vui lòng kiểm tra lại thông tin dưới đây lần cuối trước khi nhấn đặt
          xe:
        </p>
        <div className="w-full mt-10 sm:mt-8">
          <h2 className="text-xl sm:text-base font-bold text-white">
            Thông tin cuốc xe{" "}
            <span className="inline-block size-[6px] sm:size-1 rounded-full bg-primary-500"></span>
          </h2>
          <div className="w-full space-y-6 sm:space-y-5 mt-8 sm:mt-6">
            <div className="grid grid-cols-2 gap-10 sm:grid-cols-1 sm:gap-5">
              <div className="flex gap-2 text-foreground-400">
                <Calendar
                  variant="Bold"
                  className="flex-none size-6 sm:size-5"
                />
                <span className="flex-1 text-base sm:text-sm font-normal">
                  {timeFormatter.format(output.departureTime)} ngày{" "}
                  {dateFormatter.format(output.departureTime)}
                </span>
              </div>
              <div className="flex gap-2 text-foreground-400">
                <SmartCar
                  variant="Bold"
                  className="flex-none size-6 sm:size-5"
                />
                <span className="flex-1 text-base sm:text-sm font-normal">
                  {output.service}
                </span>
              </div>
            </div>
            <div className="flex gap-2 text-foreground-400">
              <Location variant="Bold" className="flex-none size-6 sm:size-5" />
              <span className="flex-1 text-base sm:text-sm font-normal">
                Điểm đến: {output.destination}
              </span>
            </div>
            <div className="flex gap-2 text-foreground-400">
              <Location variant="Bold" className="flex-none size-6 sm:size-5" />
              <span className="flex-1 text-base sm:text-sm font-normal">
                Điểm đón: {output.pickup}
              </span>
            </div>
            <div className="flex gap-2 text-foreground-400">
              <People variant="Bold" className="flex-none size-6 sm:size-5" />
              <span className="flex-1 text-base sm:text-sm font-normal">
                Số lượng hành khách: {output.numbersOfPassengers}
              </span>
            </div>
          </div>
        </div>
        <svg
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-[2px] text-divider mt-10 sm:mt-8"
        >
          <line
            x1="0"
            y1="0"
            x2="100%"
            y2="0"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="12 12"
          />
        </svg>
        <div className="w-full mt-10 sm:mt-8 grid grid-cols-[max-content,minmax(0,1fr)] sm:grid-cols-1 items-center sm:items-start gap-10 sm:gap-4">
          <div className="sm:justify-self-end">
            <span className="block sm:inline-block text-sm sm:text-xs font-normal text-foreground-500">
              Cước phí
            </span>
            <span className="mt-2 sm:mt-0 sm:ml-2 block sm:inline-block text-lg sm:text-base font-medium text-[#F59E0B]">
              {moneyFormatter.format(output.fare)}
            </span>
          </div>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <Button
              hasLoader
              isLoading={isLoading}
              intent="primary"
              className="w-full py-0 h-[70px] sm:h-[60px]"
              size={isSM ? "small" : "default"}
              onClick={handleBook}
            >
              Đặt xe
            </Button>
            <DialogContent
              aria-describedby={undefined}
              onInteractOutside={(e) => e.preventDefault()}
            >
              <VisuallyHidden asChild>
                <DialogTitle>Cảm ơn bạn đã đặt xe với Carshare!</DialogTitle>
              </VisuallyHidden>
              <CompleteModal service={serviceFieldValues.service} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }
);

const stepAnimationVariants = {
  initial: (direction: number) => ({
    x: `${100 * direction}%`,
    opacity: 0,
  }),
  animate: {
    x: "0%",
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: `${-100 * direction}%`,
    opacity: 0,
  }),
};

const LeftSection = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"section">
>(({ className, ...props }, ref) => {
  const currentStep = useBookStore((state) => state.currentStep);
  const updateCurrentStep = useBookStore((state) => state.updateCurrentStep);
  const direction = useBookStore((state) => state.stepDirection);
  const updateDirection = useBookStore((state) => state.updateStepDirection);
  const isXL = useMediaQuery({ maxWidth: 1279 });
  const isSM = useMediaQuery({ maxWidth: 639 });

  const onBack = () => {
    updateDirection(-1);
    switch (currentStep) {
      case "service":
        updateCurrentStep("search");
        return;
      case "summary":
        updateCurrentStep("service");
        return;
      default:
        throw new Error("onBack cannot be used here");
    }
  };

  const content = React.useMemo(() => {
    switch (currentStep) {
      case "search":
        return <SearchForm />;
      case "service":
        return <SelectService />;
      case "summary":
        return <Summary />;
      default:
        const unexpected: never = currentStep;
        throw new Error("currentStep is invalid");
    }
  }, [currentStep]);

  return (
    <section ref={ref} className={cn(className)} {...props}>
      {
        <Button
          hidden={currentStep === "search" && isXL}
          intent="primary"
          asLink
          size={isSM ? "extraSmall" : "small"}
          onClick={onBack}
          className={cn(
            "justify-self-start transition-all duration-200 ease-out",
            currentStep === "search" && "opacity-0 invisible xl:hidden"
          )}
        >
          Quay về
        </Button>
      }

      {/* Step */}
      <AnimatePresence mode="popLayout" initial={false} custom={direction}>
        <motion.div
          key={currentStep}
          variants={stepAnimationVariants}
          custom={direction}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
          className={cn(stepVariants({ step: currentStep }))}
        >
          {content}
        </motion.div>
      </AnimatePresence>
    </section>
  );
});

interface CompleteModalProps extends React.ComponentPropsWithoutRef<"div"> {
  service: ServiceName;
}

const CompleteModal = React.forwardRef<HTMLDivElement, CompleteModalProps>(
  ({ className, service, ...props }, ref) => {
    const isSM = useMediaQuery({ maxWidth: 639 });
    const imageUrl = React.useMemo(() => {
      switch (service) {
        case "basic":
          return carshareBasicIllustrator;
        case "premium":
          return carsharePremiumIllustrator;
        case "extra":
          return carshareExtraIllustrator;
        default:
          const unexpected: never = service;
          throw new Error("invalid service");
      }
    }, [service]);

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-[450px] sm:max-w-[420px] bg-background-950 rounded-4xl overflow-hidden",
          className
        )}
        {...props}
      >
        <div className="w-full bg-background-900 py-1">
          <figure>
            <motion.img
              initial={{ x: "-200%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", duration: 1, bounce: 0.5 }}
              src={imageUrl}
              alt={serviceNameText[service]}
              className="size-[140px] sm:size-[100px] object-contain mx-auto"
            />
          </figure>
        </div>
        <div className="w-full p-8 sm:p-6 space-y-6 sm:space-y-5">
          <div className="w-full text-center space-y-4 sm:space-y-2">
            <h6 className="text-lg sm:text-base font-semibold text-white">
              Cảm ơn bạn đã đặt xe với Carshare!
            </h6>
            <p className="text-base sm:text-sm font-normal text-foreground-500">
              Cuốc xe của bạn{" "}
              <span className="font-medium text-foreground-200">#6397180</span>{" "}
              đã được hệ thống tiếp nhận và đang chờ xử lý. Bạn vui lòng theo
              dõi thông báo để có những cập nhật mới nhất nhé.
            </p>
          </div>
          <Button
            asChild
            intent="primary"
            size={isSM ? "small" : "default"}
            className="w-full py-0 h-[60px] sm:h-[50px]"
          >
            <Link to="/ride-status">OK</Link>
          </Button>
        </div>
      </div>
    );
  }
);

interface Leg {
  distance: {
    text: string;
    value: number;
  };
  duration: {
    text: string;
    value: number;
  };
}

interface Route {
  legs: Leg[];
  overview_polyline: {
    points: string;
  };
}

interface GeocodedWaypoint {
  geocoder_status: "OK";
  place_id: string;
}

interface DirectionServiceResponse {
  routes: Route[];
  geocoded_waypoints: GeocodedWaypoint[];
}

interface DirectionInfoProps extends React.ComponentPropsWithoutRef<"div"> {
  distanceText: string;
  durationText: string;
}

const DirectionInfo = React.forwardRef<HTMLDivElement, DirectionInfoProps>(
  ({ distanceText, durationText, className }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-background-950 rounded-3xl sm:rounded-xl border-2 border-divider px-8 sm:px-4 py-5 sm:py-3 grid grid-cols-[repeat(2,max-content)] gap-16 sm:gap-8 items-center",
        className
      )}
    >
      <div className="flex gap-4 sm:gap-2 items-center">
        <Routing
          variant="Bold"
          className="flex-none size-8 sm:size-[18px] text-primary-500"
        />
        <div className="flex-1 min-w-0 space-y-1 sm:space-y-0">
          <p className="text-sm font-normal text-foreground-600 sm:hidden">
            Khoảng cách quãng đường
          </p>
          <p className="text-lg sm:text-xs font-medium sm:font-normal text-white">
            {distanceText}
          </p>
        </div>
      </div>
      <div className="flex gap-4 sm:gap-2 items-center">
        <Hourglass className="flex-none size-6 sm:size-[14px] text-primary-500" />
        <div className="flex-1 min-w-0 space-y-1 sm:space-y-0">
          <p className="text-sm font-normal text-foreground-600 sm:hidden">
            Thời gian di chuyển dự kiến
          </p>
          <p className="text-lg sm:text-xs font-medium sm:font-normal text-white">
            {durationText}
          </p>
        </div>
      </div>
    </div>
  )
);

const MotionDirectionInfo = motion.create(DirectionInfo);
