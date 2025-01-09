import React from "react";
import logo from "../assets/images/logo.svg";
import { Link, NavLink } from "react-router";
import { Notification, HambergerMenu } from "iconsax-react";
import pfp from "../assets/images/user_pfp.webp";
import { useMediaQuery } from "react-responsive";
import { z } from "zod";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "./ui/field";
import { BasicField } from "./ui/basicField";
import { Button } from "./ui/button";
import { CheckboxField } from "./ui/checkboxField";
import { DatetimeField } from "./ui/datetimeField";
import { QuantityField } from "./ui/quantityField";
import { cn } from "@/lib/utils";

type Step = "search" | "selectService" | "summary";

export function Book(): React.JSX.Element {
  const [step, setStep] = React.useState<Step>("search");

  return (
    <div className="relative w-full min-h-screen bg-background-950 lg:grid lg:grid-rows-[max-content,minmax(0,1fr)]">
      <div className="w-full min-h-screen lg:min-h-fit px-16 xl:px-10 lg:px-8 py-8 lg:pb-0 lg:pt-8 sm:px-4 sm:pt-4 grid grid-rows-[max-content,minmax(0,1fr)] justify-items-center">
        {/* Header */}
        <header className="z-10 w-full grid grid-cols-[repeat(3,max-content)] lg:grid-cols-[repeat(2,max-content)] items-center justify-between">
          {/* Hamburger button & Logo */}
          <div className="flex items-center gap-4">
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
            "xl:pt-12 sm:pt-10 z-10 w-full max-w-[1500px] lg:max-w-[800px] md:max-w-[600px] sm:max-w-[450px] grid",
            step === "search" && "items-center"
          )}
        >
          {/* Step */}
          {step === "search" ? <SearchForm /> : <SelectService />}
        </main>
      </div>
      {/* Map */}
      <div className="absolute inset-0 z-0 lg:relative">
        {/* Vertical gradient */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(39,42,55,0.95)10%,rgba(39,42,55,0)20%)] lg:bg-[linear-gradient(180deg,rgba(39,42,55,1)0%,rgba(39,42,55,0)30%)]"></div>
        {/* Horizontal gradient */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(39,42,55,1)35%,rgba(39,42,55,0)55%)] xl:bg-[linear-gradient(90deg,rgba(39,42,55,1)40%,rgba(39,42,55,0)60%)] lg:bg-[linear-gradient(90deg,rgba(39,42,55,0.7)0%,rgba(39,42,55,0)20%,rgba(39,42,55,0)80%,rgba(39,42,55,0.7)100%)]"></div>
        {/* Figmap */}
        <div className="ml-auto w-[76%] 2xl:w-[65%] lg:w-full h-full bg-[url('/src/assets/images/map_default.webp')] bg-cover"></div>
      </div>
    </div>
  );
}

const formSchema = z
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

type TFieldValues = z.infer<typeof formSchema>;

const now = new Date();

function SearchForm(): React.JSX.Element {
  const [isSearching, setIsSearching] = React.useState(false);
  const isSM = useMediaQuery({ maxWidth: 639 });
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [revalidate, setRevalidate] = React.useState(false);

  const methods = useForm<TFieldValues>({
    resolver: zodResolver(formSchema),
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

  const onValid = (data: TFieldValues) => {
    console.log(data);
    setIsSearching(true);
    const timeout = setTimeout(() => {
      setIsSearching(false);
      clearTimeout(timeout);
    }, 3000);
  };

  const onInvalid = (errors: FieldErrors<TFieldValues>) => {
    setRevalidate(true);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onValid, onInvalid)}
        className="w-[400px] 2xl:w-[384px] lg:w-full space-y-10 sm:space-y-8"
      >
        {/* Fields */}
        <div className="w-full grid gap-8 lg:gap-6 grid-cols-1 lg:grid-cols-[minmax(0,1fr),max-content] sm:grid-cols-1">
          <Field<TFieldValues>
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
                container: "col-span-full lg:col-span-1 md:col-span-full",
              }}
            />
          </Field>
          <div className="space-y-4 sm:space-y-3 col-span-full lg:col-span-1 lg:row-start-2 md:col-span-full">
            <Field<TFieldValues>
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
            <Field<TFieldValues>
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
          <Field<TFieldValues>
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
                  "col-span-full lg:col-span-1 lg:row-start-1 lg:col-start-2 md:col-start-1 md:row-start-3 sm:col-span-full",
                inner: "gap-8 sm:gap-10",
              }}
            />
          </Field>
          <Field<TFieldValues>
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
                upper: "max-w-[240px]",
                container:
                  "col-span-full lg:col-span-1 lg:row-start-2 lg:col-start-2 md:row-start-3 sm:col-span-full sm:row-start-4",
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
          className="px-0 py-0 w-full h-[70px] lg:w-[320px] lg:h-16 lg:flex lg:mx-auto sm:w-full sm:h-[56px]"
        >
          Tìm cuốc xe
        </Button>
      </form>
    </FormProvider>
  );
}

function SelectService(): React.JSX.Element {
  return <div className="w-[] grid grid-cols-1 gap-12"></div>;
}
