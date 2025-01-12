import React from "react";
import logo from "../assets/images/logo.svg";
import { Link, NavLink } from "react-router";
import { Notification, HambergerMenu, Money4 } from "iconsax-react";
import pfp from "../assets/images/user_pfp.webp";
import { useMediaQuery } from "react-responsive";
import { z } from "zod";
import {
  Controller,
  FieldErrors,
  FormProvider,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "./ui/field";
import { BasicField } from "./ui/basicField";
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

type Step = "search" | "selectService" | "summary";

export function Book(): React.JSX.Element {
  const [step, setStep] = React.useState<Step>("search");

  return (
    <div className="relative w-full min-h-screen bg-background-950 xl:grid xl:grid-rows-[max-content,minmax(0,1fr)]">
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
        <main
          className={cn(
            "grid w-full max-w-[1500px] 2xl:min-h-[800px] xl:min-h-[480px] lg:min-h-[400px] md:min-h-[480px] sm:min-h-0 pt-[120px] 2xl:pt-16 sm:pt-8 xl:items-end xl:justify-items-center",
            step === "search" && "pt-0 2xl:pt-0 items-center"
          )}
        >
          {/* Step */}
          {step === "search" ? (
            <SearchForm onNext={() => setStep("selectService")} />
          ) : step === "selectService" ? (
            <SelectService onBack={() => setStep("search")} />
          ) : (
            <div>Summary</div>
          )}
        </main>
      </div>
      {/* Map */}
      <div className="absolute xl:relative xl:min-h-[800px] lg:min-h-[600px] md:min-h-[500px] sm:min-h-[360px] inset-0 z-0 xl:-mt-[70px] sm:-mt-[60px]">
        {/* Vertical gradient */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(39,42,55,0.95)10%,rgba(39,42,55,0)20%)] xl:bg-[linear-gradient(180deg,rgba(39,42,55,1)5%,rgba(39,42,55,0)25%)]"></div>
        {/* Horizontal gradient */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(39,42,55,1)35%,rgba(39,42,55,0)55%)] 2xl:bg-[linear-gradient(90deg,rgba(39,42,55,1)40%,rgba(39,42,55,0)60%)] xl:bg-[linear-gradient(90deg,rgba(39,42,55,0)0%,rgba(39,42,55,0)100%)]"></div>
        {/* Figmap */}
        <div className="ml-auto xl:ml-0 w-[76%] 2xl:w-[62.5%] xl:w-full h-full bg-[url('/src/assets/images/map_default.webp')] bg-cover"></div>
      </div>
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

    if (
      !z
        .string()
        .datetime({ local: true })
        .safeParse(
          `${departureTime.year}-${departureTime.month.padStart(
            2,
            "0"
          )}-${departureTime.date.padStart(
            2,
            "0"
          )}T${departureTime.hour.padStart(
            2,
            "0"
          )}:${departureTime.minute.padStart(2, "0")}:00`
        ).success
    ) {
      ctx.addIssue({
        code: "invalid_date",
        message: "Thời gian không hợp lệ",
        path: ["departureTime"],
      });
    }
  });

type SearchFieldValues = z.infer<typeof SearchFormSchema>;

const now = new Date();

function SearchForm({ onNext }: { onNext: () => void }): React.JSX.Element {
  const [isSearching, setIsSearching] = React.useState(false);
  const isSM = useMediaQuery({ maxWidth: 639 });
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [revalidate, setRevalidate] = React.useState(false);

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
    shouldFocusError: false,
  });

  const onValid = (data: SearchFieldValues) => {
    console.log(data);
    setIsSearching(true);
    const timeout = setTimeout(() => {
      setIsSearching(false);
      clearTimeout(timeout);
      onNext();
    }, 3000);
  };

  const onInvalid = (errors: FieldErrors<SearchFieldValues>) => {
    setRevalidate(true);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onValid, onInvalid)}
        className="w-full max-w-[450px] md:max-w-[580px] space-y-10 sm:space-y-8"
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
            <BasicField
              inputProps={{
                type: "text",
                placeholder: "Nhập địa chỉ bạn muốn đến...",
              }}
              classNames={{
                container:
                  "col-span-full xl:col-span-1 lg:col-span-1 md:col-span-full",
              }}
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
              <BasicField
                inputProps={{
                  type: "text",
                  placeholder: "Nhập địa chỉ để tài xế đón bạn...",
                }}
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
                left: "max-w-[200px] sm:max-w-[164px]",
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
          className="px-0 py-0 w-full h-[70px] xl:max-w-[360px] lg:w-[320px] xl:flex xl:mx-auto sm:w-full sm:h-[60px]"
        >
          Tìm cuốc xe
        </Button>
      </form>
    </FormProvider>
  );
}

const ServiceFormSchema = z.object({
  type: z.enum(["basic", "premium", "extra"], {
    message: "Vui lòng chọn dịch vụ trước khi tiếp tục",
  }),
});

type ServiceFieldValues = z.infer<typeof ServiceFormSchema>;

type Service = {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
  fee: number;
  value: ServiceFieldValues["type"];
};

const services: Service[] = [
  {
    id: 1,
    imageUrl: carshareBasicIllustrator,
    name: "Carshare Basic",
    description: "Dịch vụ cơ bản với dòng xe phổ thông, tiết kiệm chi phí",
    fee: 96000,
    value: "basic",
  },
  {
    id: 2,
    imageUrl: carsharePremiumIllustrator,
    name: "Carshare Premium",
    description: "Dịch vụ cao cấp với dòng xe hạng sang tiện nghi, hiện đại",
    fee: 124800,
    value: "premium",
  },
  {
    id: 3,
    imageUrl: carshareExtraIllustrator,
    name: "Carshare Extra",
    description: "Dòng xe cỡ lớn (7 - 16 chỗ) đủ sức chứa cho nhiều hành khách",
    fee: 105300,
    value: "extra",
  },
];

function SelectService({ onBack }: { onBack: () => void }): React.JSX.Element {
  const methods = useForm<ServiceFieldValues>({
    resolver: zodResolver(ServiceFormSchema),
  });
  const isSM = useMediaQuery({ maxWidth: 639 });

  const onValid = (data: ServiceFieldValues) => {
    console.log(data);
  };

  const onInvalid = (error: FieldErrors) => {
    console.log(error);
  };

  return (
    <div className="max-w-[500px] xl:max-w-[520px] sm:max-w-[420px] space-y-12 xl:space-y-10 sm:space-y-8">
      <Button
        intent="primary"
        asLink
        size={isSM ? "extraSmall" : "small"}
        onClick={onBack}
      >
        Quay về
      </Button>
      <div className="w-full space-y-8 sm:space-y-6">
        <p className="w-full text-base sm:text-sm font-normal text-foreground-600">
          Vui lòng lựa chọn dịch vụ bạn muốn sử dụng:
        </p>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onValid)}
            className="w-full space-y-12 xl:space-y-10 sm:space-y-8"
          >
            <Field control={methods.control} name="type">
              <Controller
                control={methods.control}
                name="type"
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
                        className="block text-left w-full group rounded-3xl sm:rounded-2xl data-[state=checked]:outline data-[state=checked]:outline-8 data-[state=checked]:outline-primary-flat"
                      >
                        <div className="relative w-full rounded-[inherit] p-5 xl:px-6 sm:px-4 sm:py-3 bg-background-900 group-data-[state=checked]:bg-[rgba(29,144,245,0.05)] group-data-[state=checked]:outline group-data-[state=checked]:outline-2 group-data-[state=checked]:outline-primary-500">
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
                                {service.fee.toLocaleString("en-US")}đ
                              </div>
                            </div>
                          </div>
                          <div className="absolute size-4 sm:size-[14px] rounded-full bg-background-700 right-4 top-4 flex items-center justify-center group-data-[state=checked]:bg-transparent group-data-[state=checked]:border-2 group-data-[state=checked]:border-primary-500">
                            <span className="size-2 sm:size-[6px] rounded-full bg-transparent group-data-[state=checked]:bg-primary-500"></span>
                          </div>
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
    </div>
  );
}
