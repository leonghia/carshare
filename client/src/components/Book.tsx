import React from "react";
import logo from "../assets/images/logo.svg";
import { Link, NavLink } from "react-router";
import { Notification } from "iconsax-react";
import pfp from "../assets/images/user_pfp.webp";
import { useMediaQuery } from "react-responsive";
import { date, z } from "zod";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "./ui/field";
import { BasicField } from "./ui/basicField";
import { Button } from "./ui/button";
import { CheckboxField } from "./ui/checkboxField";
import { DatetimeField } from "./ui/datetimeField";

export function Book(): React.JSX.Element {
  return (
    <div className="w-full min-h-screen bg-background-950 px-16 py-8 grid grid-rows-[max-content,minmax(0,1fr)] justify-items-center ">
      {/* Header */}
      <header className="w-full grid grid-cols-[repeat(3,max-content)] items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="carshare logo" className="h-8 object-cover" />
        </Link>
        {/* Navbar */}
        <nav className="w-[31.25rem] flex items-center justify-between">
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
        <div className="flex items-center gap-10">
          <button type="button" className="relative">
            <Notification
              variant="Bold"
              className="size-8 text-foreground-500"
            />
            <span className="block absolute top-[2px] left-[18px] size-3 rounded-full bg-danger-500 border-2 border-white"></span>
          </button>
          <button type="button">
            <img
              src={pfp}
              alt="user profile picture"
              className="size-10 rounded-full border-2 border-primary-500 shadow-xl"
            />
          </button>
        </div>
      </header>
      {/* Main */}
      <main className="w-full max-w-[1400px] grid items-center">
        {/* Search form */}
        <SearchForm />
      </main>
      {/* Map */}
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
    numbersOfPassengers: z.string().trim(),
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
  const buttonRef = React.useRef<HTMLButtonElement>(null);
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
        className="w-[400px] space-y-10"
      >
        {/* Fields */}
        <div className="w-full space-y-6">
          <Field<TFieldValues>
            label="Điểm đến"
            required
            size={isSM ? "small" : "default"}
            name="destination"
          >
            <BasicField
              control={methods.control}
              name="destination"
              inputProps={{
                type: "text",
                placeholder: "Nhập địa chỉ bạn muốn đến...",
              }}
            />
          </Field>
          <div className="space-y-4">
            <Field<TFieldValues>
              label="Điểm đón"
              required
              size={isSM ? "small" : "default"}
              name="pickup"
            >
              <BasicField
                control={methods.control}
                name="pickup"
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
            >
              <CheckboxField
                control={methods.control}
                name="useCurrentLocation"
                classNames={{
                  container: "items-center",
                  label: "text-sm font-normal text-foreground-200",
                }}
              />
            </Field>
          </div>
          <Field<TFieldValues>
            label="Thời gian khởi hành"
            required
            size={isSM ? "small" : "default"}
            name="departureTime"
          >
            <DatetimeField
              invalidMessage="Thời gian không hợp lệ"
              requiredMessage="Thời gian khởi hành không được để trống"
              revalidate={revalidate}
              control={methods.control}
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
            />
          </Field>
        </div>
        {/* Search button */}
        <Button
          ref={buttonRef}
          hasLoader
          isLoading={isSearching}
          size={isSM ? "small" : "default"}
          type="submit"
          className="px-0 py-0 w-full h-[70px]"
        >
          Tìm cuốc xe
        </Button>
      </form>
    </FormProvider>
  );
}
