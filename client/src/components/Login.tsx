import React from "react";
import curvedDivider from "../assets/images/curved_divider_1.svg";
import logo from "../assets/images/logo.svg";
import { AnimatePresence, motion } from "motion/react";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { useMediaQuery } from "react-responsive";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "./ui/field";
import { BasicField } from "./ui/basicField";
import { PasswordField } from "./ui/passwordField";
import { CheckboxField } from "./ui/checkboxField";
import { Button } from "./ui/button";

export function Login(): React.JSX.Element {
  const logoRef = React.useRef<HTMLElement>(null);
  const navigate = useNavigate();

  const onLoginSuccess = () => {
    navigate("/");
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* Right */}
      <motion.div
        initial={{ opacity: 0, x: "6.25rem" }}
        animate={{ opacity: 1, x: "0rem" }}
        transition={{ type: "spring", duration: 1, bounce: 0 }}
        className="absolute z-0 w-[58%] lg:w-full h-full right-0 top-0 bg-[url('/src/assets/images/background_side_default.webp')] 2xl:bg-[url('/src/assets/images/background_side_2xl.webp')] xl:bg-[url('/src/assets/images/background_side_xl.webp')] lg:bg-[url('/src/assets/images/background_side_lg.webp')] md:bg-[url('/src/assets/images/background_side_md.webp')] sm:bg-[url('/src/assets/images/background_side_sm.webp')]  bg-cover bg-right"
      ></motion.div>
      {/* Container */}
      <div className="relative z-10 w-full min-h-screen grid justify-items-center items-center px-16 py-20 sm:px-4 sm:py-8 bg-[linear-gradient(238deg,rgba(39,42,55,0.65)0%,rgba(39,42,55,1)40%)] xl:bg-[linear-gradient(248deg,rgba(39,42,55,0.65)0%,rgba(39,42,55,1)40%)] lg:bg-[linear-gradient(218deg,rgba(39,42,55,0.97)0%,rgba(39,42,55,1)50%,rgba(39,42,55,0.97)100%)] sm:bg-[linear-gradient(218deg,rgba(39,42,55,0.99)0%,rgba(39,42,55,1)50%,rgba(39,42,55,0.99)100%)]">
        {/* Curved vector */}
        <figure className="absolute top-0 left-[calc(50%+1.875rem)] 2xl:left-[calc(50%+5rem)] xl:hidden -translate-x-1/2 z-20 w-fit h-full">
          <img
            src={curvedDivider}
            alt="divider"
            className="object-fill h-full w-[17.25rem] 2xl:w-[12.5rem]"
          />
        </figure>
        {/* Wrapper */}
        <div className="w-full max-w-[73.75rem] sm:max-w-[27.5rem] h-fit lg:grid lg:justify-items-center">
          {/* Inner */}
          <motion.div
            initial={{ opacity: 0, x: "-9.375rem" }}
            animate={{ opacity: 1, x: "0rem" }}
            transition={{ type: "spring", duration: 1 }}
            className="w-[30rem] sm:w-full h-fit space-y-16 sm:space-y-8"
          >
            {/* Heading */}
            <div className="w-full space-y-4 sm:space-y-1">
              <div className="flex gap-2 sm:gap-1">
                <h1 className="text-4xl sm:text-xl font-bold sm:font-semibold text-white shrink-0">
                  Đăng nhập
                </h1>
                <span className="inline-block translate-y-6 sm:translate-y-[15px] size-[0.625rem] sm:size-[0.375rem] bg-primary-500 rounded-full"></span>
              </div>
              <p className="font-normal text-base sm:text-xs text-foreground-500">
                Bạn chưa có tài khoản?{" "}
                <Link
                  to="/register"
                  className="font-medium text-primary-500 hover:text-primary-400 transition-all duration-300 ease-out"
                >
                  Đăng ký ngay
                </Link>
              </p>
            </div>
            {/* Login form */}
            <LoginForm onSuccess={onLoginSuccess} />
          </motion.div>
        </div>
        {/* Logo */}
        <motion.figure
          ref={logoRef}
          initial={{ opacity: 0, x: "6.25rem" }}
          animate={{ opacity: 1, x: "0rem" }}
          transition={{ type: "spring", duration: 1 }}
          className="sm:hidden absolute right-10 bottom-10 w-fit h-fit"
        >
          <img
            src={logo}
            alt="carshare logo"
            className="h-16 xl:h-10 sm:h-6 object-contain"
          />
        </motion.figure>
        {/* Logo (mobile-only) */}
        <figure className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 w-fit h-fit">
          <img
            src={logo}
            alt="carshare logo"
            className="h-16 xl:h-10 sm:h-6 object-contain"
          />
        </figure>
      </div>
    </div>
  );
}

const formSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Địa chỉ email không được để trống" })
    .max(254, { message: "Email không chứa quá 254 ký tự" })
    .email({ message: "Địa chỉ email không hợp lệ" }),
  password: z
    .string()
    .trim()
    .min(1, { message: "Mật khẩu không được để trống" })
    .max(128, { message: "Mật khẩu không chứa quá 128 ký tự" }),
  remember: z.boolean(),
});

type TFieldValues = z.infer<typeof formSchema>;

interface LoginFormProps {
  onSuccess: () => void;
}

function LoginForm({ onSuccess }: LoginFormProps): React.JSX.Element {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const isSM = useMediaQuery({ maxWidth: 639 });
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [error, setError] = React.useState<string | null>(null);

  const methods = useForm<TFieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
    shouldFocusError: false,
  });

  const onValid = (data: TFieldValues) => {
    setIsSubmitting(true);
    setError(null);
    const timeout = setTimeout(() => {
      const dto = {
        email: data.email,
        password: data.password,
      };
      setIsSubmitting(false);
      const rand = Math.random();

      const isError = rand >= 0.8;

      clearTimeout(timeout);

      if (isError) {
        setError("Email hoặc mật khẩu không chính xác");
      } else {
        onSuccess();
      }
    }, 3000);
  };

  return (
    <FormProvider {...methods}>
      {/* Form */}
      <motion.form
        onSubmit={methods.handleSubmit(onValid)}
        className="w-full space-y-12 sm:space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "tween", duration: 1, ease: "easeIn" }}
      >
        {/* Fields */}
        <div className="w-full grid grid-cols-1 gap-6 sm:gap-5">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: "-2rem" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: "-2rem",
                  transition: { duration: 0.1, ease: "easeOut" },
                }}
                transition={{ type: "tween", duration: 0.3, ease: "easeIn" }}
                className="w-full h-fit px-6 sm:px-4 py-4 rounded-2xl sm:rounded-xl bg-danger-flat"
              >
                <p className="text-sm sm:text-xs font-normal text-danger-500">
                  {error}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          <Field<TFieldValues>
            label="Email"
            required
            size={isSM ? "small" : "default"}
            name="email"
          >
            <BasicField
              control={methods.control}
              name="email"
              inputProps={{
                type: "email",
                placeholder: "abc@email.com",
                maxLength: 254,
              }}
              className="col-span-full"
            />
          </Field>
          <Field<TFieldValues>
            label="Mật khẩu"
            required
            size={isSM ? "small" : "default"}
            name="password"
          >
            <PasswordField
              control={methods.control}
              name="password"
              maxLength={128}
              placeholder="****************"
              className="col-span-full"
            />
          </Field>
          <div className="flex items-center justify-between">
            <Field<TFieldValues>
              label="Ghi nhớ tôi"
              size={isSM ? "small" : "default"}
              name="remember"
            >
              <CheckboxField
                control={methods.control}
                name="remember"
                labelProps={{ className: "font-normal text-foreground-100" }}
              />
            </Field>
            <Button
              intent="secondary"
              asLink={true}
              size={isSM ? "small" : "default"}
            >
              Quên mật khẩu?
            </Button>
          </div>
        </div>
        {/* Submit button */}
        <Button
          ref={buttonRef}
          hasLoader
          isLoading={isSubmitting}
          size={isSM ? "small" : "default"}
          type="submit"
          className="px-0 py-0 w-[18.75rem] h-[4.375rem] sm:w-full sm:h-[3.75rem]"
        >
          Đăng nhập
        </Button>
      </motion.form>
    </FormProvider>
  );
}
