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

type BookStoreState = {
  searchFieldValues: SearchFieldValues | null;
  serviceFieldValues: ServiceFieldValuesWithFee | null;
  currentStep: Step;
  stepDirection: -1 | 1;
  destinationID: string | null;
  pickupID: string | null;
};

type BookStoreActions = {
  updateSearchFieldValues: (newValues: SearchFieldValues | null) => void;
  updateServiceFieldValues: (
    newValues: ServiceFieldValuesWithFee | null
  ) => void;
  updateCurrentStep: (newStep: Step) => void;
  updateStepDirection: (newStepDirection: -1 | 1) => void;
  updateDestinationID: (newDestinationID: string | null) => void;
  updatePickupID: (newPickupID: string | null) => void;
};

type BookStore = BookStoreState & BookStoreActions;

const useBookStore = create<BookStore>()((set) => ({
  destinationID: null,
  pickupID: null,
  route: null,
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
    set((state) => ({
      ...state,
      stepDirection: newStepDirection,
    })),
  updateDestinationID: (newDestinationID) => {
    set((state) => ({ ...state, destinationID: newDestinationID }));
  },
  updatePickupID: (newPickupID) => {
    set((state) => ({ ...state, pickupID: newPickupID }));
  },
}));

const dateFormatter = new Intl.DateTimeFormat("vi-VN", {
  dateStyle: "short",
});

const timeFormatter = new Intl.DateTimeFormat("vi-VN", {
  timeStyle: "short",
});

const feeFormatter = new Intl.NumberFormat("vi-VN");

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
    <div className="overflow-hidden relative w-full min-h-screen bg-background-950 xl:grid xl:grid-rows-[max-content,minmax(0,1fr)]">
      {/* Wrapper */}
      <div
        className={cn(
          "relative z-10 w-full min-h-screen xl:min-h-fit px-16 xl:px-10 md:px-8 sm:px-4 pt-8 sm:pt-4 pb-20 xl:pb-0 grid grid-rows-[max-content,minmax(0,1fr)] xl:grid-rows-[repeat(2,max-content)] justify-items-center"
        )}
      >
        {/* Header */}
        <header className="z-10 w-full grid grid-cols-[repeat(3,max-content)] lg:grid-cols-[repeat(2,max-content)] items-center justify-between">
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
          <nav className="w-[31.25rem] xl:w-[400px] lg:hidden flex items-center justify-between">
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
        <Main />
      </div>
      {/* Map */}
      <Map />
    </div>
  );
}

function Map(): React.JSX.Element {
  const pickupID = useBookStore((state) => state.pickupID);
  const destinationID = useBookStore((state) => state.destinationID);

  const pickupDetail = usePlaceDetail(pickupID);
  const destinationDetail = usePlaceDetail(destinationID);

  if (pickupDetail) {
    console.log(pickupDetail.formatted_address);
  }

  if (destinationDetail) {
    console.log(destinationDetail.formatted_address);
  }

  return (
    <div className="absolute xl:relative xl:min-h-[800px] lg:min-h-[600px] md:min-h-[500px] sm:min-h-[360px] inset-0 z-0 xl:-mt-[70px] sm:-mt-[60px]">
      {/* Vertical gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(39,42,55,0.95)10%,rgba(39,42,55,0)20%)] xl:bg-[linear-gradient(180deg,rgba(39,42,55,1)5%,rgba(39,42,55,0)25%)]"></div>
      {/* Horizontal gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(39,42,55,1)35%,rgba(39,42,55,0)55%)] 2xl:bg-[linear-gradient(90deg,rgba(39,42,55,1)40%,rgba(39,42,55,0)60%)] xl:bg-[linear-gradient(90deg,rgba(39,42,55,0)0%,rgba(39,42,55,0)100%)]"></div>
      {/* Figmap */}
      <div className="ml-auto xl:ml-0 w-[76%] 2xl:w-[62.5%] xl:w-full h-full bg-[url('/src/assets/images/map_default.webp')] bg-cover"></div>
    </div>
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

interface SearchFormProps extends React.ComponentPropsWithoutRef<"form"> {}

const SearchForm = React.forwardRef<HTMLFormElement, SearchFormProps>(
  ({ className, ...props }, ref) => {
    const [isSearching, setIsSearching] = React.useState(false);
    const isSM = useMediaQuery({ maxWidth: 639 });
    const [revalidate, setRevalidate] = React.useState(false);
    const fieldValues = useBookStore((state) => state.searchFieldValues);
    const destinationID = useBookStore((state) => state.destinationID);
    const pickupID = useBookStore((state) => state.pickupID);

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
      if (!destinationID) {
        methods.setError("destination", {
          type: "manual",
          message: addressNotFoundMessage,
        });
      }

      if (!pickupID) {
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
          ref={ref}
          onSubmit={methods.handleSubmit(onSubmit, onInvalid)}
          className={cn("w-full space-y-10 sm:space-y-8", className)}
          {...props}
        >
          {/* Fields */}
          <div className="w-full grid gap-8 grid-cols-1 xl:grid-cols-[minmax(0,1fr),max-content] lg:grid-cols-[minmax(0,1fr),max-content] sm:grid-cols-1 sm:gap-6">
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

            <div className="space-y-4 sm:space-y-3 col-span-full xl:col-span-1 xl:row-start-2 lg:col-span-1 lg:row-start-2 md:col-span-full">
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
);

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
        api_key: import.meta.env.VITE_MAPAPI_KEY,
        location: "21.026678444340764,105.8538045213328",
        limit: 10,
        radius: 50,
        input: query,
        more_compound: false,
      };
      axios
        .get<PlacesSearchServiceResponse>(
          import.meta.env.VITE_GGMAPS_URL + "/Place/AutoComplete",
          {
            params: requestParams,
          }
        )
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

function usePlaceDetail(placeID: string | null) {
  const [data, setData] = React.useState<PlaceDetail | null>(null);

  React.useEffect(() => {
    let ignore = false;

    if (placeID) {
      const requestParams: PlaceDetailRequestParams = {
        api_key: import.meta.env.VITE_MAPAPI_KEY,
        place_id: placeID,
      };

      axios
        .get<PlaceDetailServiceResponse>(
          import.meta.env.VITE_GGMAPS_URL + "/Place/Detail",
          {
            params: requestParams,
          }
        )
        .then((res) => {
          if (res.data.status === "OK" && !ignore) setData(res.data.result);
        })
        .catch((err) => console.error(err));
    }

    return () => {
      ignore = true;
    };
  }, [placeID]);

  return data;
}

function LocationField({
  locationType,
  onSelectLocation,
}: {
  locationType: "Destination" | "Pickup";
  onSelectLocation: () => void;
}): React.JSX.Element {
  const fieldValues = useBookStore((state) => state.searchFieldValues);
  const updateLocationID = useBookStore((state) =>
    locationType === "Destination"
      ? state.updateDestinationID
      : state.updatePickupID
  );
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
    onSelectLocation();
    updateLocationID(placeID);
  };

  const handleClear = () => {
    setPlaces([]);
    updateLocationID(null);
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
}: {
  serviceName: ServiceName;
  distance: number;
}) => {
  const baseFare = 10_000;
  switch (serviceName) {
    case "basic":
      return baseFare + distance * 7_000;
    case "premium":
      return baseFare + distance * 12_000;
    case "extra":
      return baseFare + distance * 9_000;
    default:
      const unexpected: never = serviceName;
      throw new Error("invalid serviceName");
  }
};

interface SelectServiceProps extends React.ComponentPropsWithoutRef<"div"> {}

const SelectService = React.forwardRef<HTMLDivElement, SelectServiceProps>(
  ({ className, ...props }, ref) => {
    const fieldValues = useBookStore((state) => state.serviceFieldValues);
    const updateFieldValues = useBookStore(
      (state) => state.updateServiceFieldValues
    );
    const destinationID = useBookStore((state) => state.destinationID);
    const pickupID = useBookStore((state) => state.pickupID);
    const updateCurrentStep = useBookStore((state) => state.updateCurrentStep);
    const updateDirection = useBookStore((state) => state.updateStepDirection);

    const methods = useForm<ServiceFieldValues>({
      resolver: zodResolver(ServiceFormSchema),
      values: fieldValues
        ? {
            service: fieldValues.service,
          }
        : undefined,
    });
    const isSM = useMediaQuery({ maxWidth: 639 });
    const calculateFee = React.useCallback(
      (service: ServiceName) => {
        switch (service) {
          case "basic":
            return 96000;
          case "premium":
            return 124800;
          case "extra":
            return 105300;
          default:
            const unexpected: never = service;
            throw new Error("invalid service");
        }
      },
      [destinationID, pickupID]
    );

    const onValid = (data: ServiceFieldValues) => {
      updateFieldValues({
        fee: calculateFee(data.service),
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
                              {feeFormatter.format(calculateFee(service.value))}
                              đ
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
  fee: number;
};

const Summary = React.forwardRef<HTMLDivElement, SummaryProps>(
  ({ className, ...props }, ref) => {
    const isSM = useMediaQuery({ maxWidth: 639 });
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const searchFieldValues = useBookStore((state) => state.searchFieldValues);
    const serviceFieldValues = useBookStore(
      (state) => state.serviceFieldValues
    );

    if (!searchFieldValues) throw new Error("invalid searchFieldValues");
    if (!serviceFieldValues) throw new Error("invalid serviceFieldValues");

    const output: Output = React.useMemo(
      () => ({
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
        fee: Number(serviceFieldValues.fee),
      }),
      [searchFieldValues, serviceFieldValues]
    );

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
        <p className="w-full text-base sm:text-sm font-normal text-foreground-600 mt-12 sm:mt-10">
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
              {feeFormatter.format(output.fee)}đ
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

interface ServiceFieldValuesWithFee extends ServiceFieldValues {
  fee: number;
}

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

const Main = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"main">
>(({ className, ...props }, ref) => {
  const currentStep = useBookStore((state) => state.currentStep);
  const updateCurrentStep = useBookStore((state) => state.updateCurrentStep);
  const direction = useBookStore((state) => state.stepDirection);
  const updateDirection = useBookStore((state) => state.updateStepDirection);
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
    <main
      ref={ref}
      className={cn(
        "grid w-full max-w-[1500px] 2xl:min-h-[800px] xl:min-h-[480px] lg:min-h-[400px] md:min-h-[480px] sm:min-h-0 pt-[120px] 2xl:pt-20 sm:pt-8 xl:items-end xl:justify-items-center",
        currentStep === "search" && "pt-0 2xl:pt-0 items-center",
        className
      )}
      {...props}
    >
      <div className="w-[500px] xl:w-full space-y-12 sm:space-y-8">
        {currentStep !== "search" && (
          <Button
            intent="primary"
            asLink
            size={isSM ? "extraSmall" : "small"}
            onClick={onBack}
          >
            Quay về
          </Button>
        )}

        {/* Step */}
        <AnimatePresence mode="wait" initial={false} custom={direction}>
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
      </div>
    </main>
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
