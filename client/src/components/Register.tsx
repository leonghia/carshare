import { z } from "zod";
import curvedDivider from "../assets/images/curved_divider_1.svg";
import logo from "../assets/images/logo.svg";
import { Button } from "./ui/button";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useAnimate } from "motion/react";
import { Field } from "./ui/field";
import { BasicField } from "./ui/basicField";
import { DateField } from "./ui/dateField";
import { PasswordField } from "./ui/passwordField";
import { CheckboxField } from "./ui/checkboxField";
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import checkEmailIllustrator from "../assets/images/check_email_illustrator.webp";
import { VisuallyHidden } from "./ui/visuallyHidden";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router";
import { PageTitle } from "./ui/pageTitle";
import { calculatePasswordStrength } from "@/utils/password";
import { obscureEmail } from "@/utils/email";

export function Register(): JSX.Element {
  return (
    <div className="w-full min-h-screen relative overflow-x-hidden">
      {/* Right */}
      <motion.div
        initial={{ opacity: 0, x: "6.25rem" }}
        animate={{ opacity: 1, x: "0rem" }}
        transition={{ type: "spring", duration: 1, bounce: 0 }}
        className="absolute z-0 top-0 right-0 w-[58%] lg:w-full h-full bg-[url('/src/assets/images/background_side_default.webp')] 2xl:bg-[url('/src/assets/images/background_side_2xl.webp')] xl:bg-[url('/src/assets/images/background_side_xl.webp')] lg:bg-[url('/src/assets/images/background_side_lg.webp')] md:bg-[url('/src/assets/images/background_side_md.webp')] sm:bg-[url('/src/assets/images/background_side_sm.webp')] bg-cover bg-right"
      ></motion.div>
      {/* Container */}
      <div className="grid justify-items-center items-center sm:items-start px-16 md:px-8 py-20 md:py-16 sm:px-4 sm:py-8 overflow-x-hidden relative z-10 w-full min-h-screen bg-[linear-gradient(238deg,rgba(39,42,55,0.65)0%,rgba(39,42,55,1)40%)] xl:bg-[linear-gradient(248deg,rgba(39,42,55,0.65)0%,rgba(39,42,55,1)40%)] lg:bg-[linear-gradient(218deg,rgba(39,42,55,0.97)0%,rgba(39,42,55,1)50%,rgba(39,42,55,0.97)100%)] sm:bg-[linear-gradient(218deg,rgba(39,42,55,0.99)0%,rgba(39,42,55,1)50%,rgba(39,42,55,0.99)100%)]">
        <div className="w-full max-w-7xl h-fit lg:grid lg:justify-items-center sm:gap-12">
          <motion.div
            initial={{ opacity: 0, x: "-9.375rem" }}
            animate={{ opacity: 1, x: "0rem" }}
            transition={{ type: "spring", duration: 1 }}
            className="w-[34rem] sm:w-full sm:grid sm:justify-items-center h-fit space-y-12 sm:space-y-8"
          >
            <div className="w-full space-y-4 sm:space-y-2">
              <PageTitle title="Đăng ký tài khoản" />
              <p className="font-normal text-base sm:text-xs text-foreground-500">
                Bạn đã có tài khoản?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-500 hover:text-primary-400 transition-all duration-300 ease-out"
                >
                  Đăng nhập ngay
                </Link>
              </p>
            </div>
            <SignupForm />
          </motion.div>
          <figure className="hidden sm:block">
            <img src={logo} alt="logo" className="h-6 object-contain" />
          </figure>
        </div>
      </div>
      {/* Vector */}
      <figure className="absolute top-0 left-[calc(50%+1.875rem)] 2xl:left-[calc(50%+5rem)] xl:hidden -translate-x-1/2 z-20 w-fit h-full">
        <img
          src={curvedDivider}
          alt="divider"
          className="object-fill h-full w-[17.25rem] 2xl:w-[12.5rem]"
        />
      </figure>
      {/* Logo */}
      <motion.figure
        initial={{ opacity: 0, x: "6.25rem" }}
        animate={{ opacity: 1, x: "0rem" }}
        transition={{ type: "spring", duration: 1 }}
        className="sm:hidden absolute right-12 lg:right-10 md:right-8 bottom-10 md:bottom-8 z-20"
      >
        <img
          src={logo}
          alt="logo"
          className="h-16 lg:h-10 md:h-8 object-contain"
        />
      </motion.figure>
    </div>
  );
}

const formSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(1, { message: "Họ tên không được để trống" })
      .max(64, { message: "Họ tên chỉ được chứa tối đa 64 ký tự" })
      .regex(
        /^[a-zA-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/gm,
        { message: "Họ tên không hợp lệ" }
      ),
    phoneNumber: z
      .string()
      .trim()
      .transform((val) => val.replace(/\s+/g, ""))
      .pipe(
        z
          .string()
          .min(1, { message: "Số điện thoại không được để trống" })
          .length(10, { message: "Số điện thoại không hợp lệ" })
      ),
    email: z
      .string()
      .trim()
      .min(1, { message: "Địa chỉ email không được để trống" })
      .max(254, { message: "Email không chứa quá 254 ký tự" })
      .email({ message: "Địa chỉ email không hợp lệ" }),
    nationalID: z
      .string()
      .trim()
      .min(1, { message: "Số CCCD không được để trống" })
      .max(12, { message: "Số CCCD không chứa quá 12 số" }),
    issuedAt: z.object({
      date: z.string().trim(),
      month: z.string().trim(),
      year: z.string().trim(),
    }),
    password: z
      .string()
      .trim()
      .min(1, { message: "Mật khẩu không được để trống" })
      .max(128, { message: "Mật khẩu không chứa quá 128 ký tự" }),
    retypePassword: z
      .string()
      .trim()
      .min(1, { message: "Mật khẩu nhập lại không được để trống" }),
    agree: z.boolean().refine((val) => val === true, {
      message: "Bạn phải đồng ý cam đoan",
    }),
  })
  .superRefine(({ password, retypePassword, issuedAt }, ctx) => {
    if (calculatePasswordStrength(password) === "weak") {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu của bạn quá yếu",
        path: ["password"],
      });
    }

    if (password !== retypePassword) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu nhập lại phải trùng khớp",
        path: ["retypePassword"],
      });
    }
    if (
      issuedAt.date.length === 0 &&
      issuedAt.month.length === 0 &&
      issuedAt.year.length === 0
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Ngày cấp không được để trống",
        path: ["issuedAt"],
        fatal: true,
      });

      return z.NEVER;
    }

    if (
      !z
        .string()
        .date()
        .safeParse(
          `${issuedAt.year}-${issuedAt.month.padStart(
            2,
            "0"
          )}-${issuedAt.date.padStart(2, "0")}`
        ).success
    ) {
      ctx.addIssue({
        code: "invalid_date",
        message: "Ngày cấp không hợp lệ",
        path: ["issuedAt"],
      });
    }
  });

type TFieldValues = z.infer<typeof formSchema>;

const now = new Date();

function SignupForm(): JSX.Element {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [revalidate, setRevalidate] = React.useState(false);
  const [isOpenCompleteModal, setIsOpenCompleteModal] = React.useState(false);
  const isSM = useMediaQuery({ maxWidth: 639 });

  const methods = useForm<TFieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      nationalID: "",
      issuedAt: {
        date: "",
        month: "",
        year: "",
      },
      password: "",
      retypePassword: "",
      agree: false,
    },
    shouldFocusError: false,
  });

  const onValid = (data: TFieldValues) => {
    setIsSubmitting(true);
    const timeout = setTimeout(() => {
      setIsSubmitting(false);
      setIsOpenCompleteModal(true);
      clearTimeout(timeout);
    }, 3000);
  };

  const onInvalid = (errors: FieldErrors<TFieldValues>) => {
    setRevalidate(true);
  };

  return (
    <FormProvider {...methods}>
      <motion.form
        onSubmit={methods.handleSubmit(onValid, onInvalid)}
        className="w-full sm:max-w-[27.5rem] space-y-12 sm:space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "tween", duration: 1, ease: "easeIn" }}
      >
        <div className="w-full grid grid-cols-2 gap-6 sm:gap-5">
          <Field<TFieldValues>
            label="Họ tên"
            required
            size={isSM ? "small" : "default"}
            name="fullName"
            control={methods.control}
          >
            <BasicField
              inputProps={{
                type: "text",
                placeholder: "Nguyễn Văn A",
                maxLength: 64,
              }}
              classNames={{ container: "col-span-1 sm:col-span-full" }}
            />
          </Field>
          <Field<TFieldValues>
            label="Số điện thoại"
            required
            size={isSM ? "small" : "default"}
            name="phoneNumber"
            control={methods.control}
          >
            <BasicField
              inputProps={{
                type: "tel",
                inputMode: "tel",
                placeholder: "0123 456 789",
                maxLength: 12,
              }}
              classNames={{ container: "col-span-1 sm:col-span-full" }}
            />
          </Field>
          <Field<TFieldValues>
            label="Email"
            required
            size={isSM ? "small" : "default"}
            name="email"
            control={methods.control}
          >
            <BasicField
              inputProps={{
                type: "email",
                placeholder: "abc@email.com",
                maxLength: 254,
              }}
              classNames={{ container: "col-span-full" }}
            />
          </Field>
          <Field<TFieldValues>
            label="Số CCCD"
            required
            size={isSM ? "small" : "default"}
            name="nationalID"
            control={methods.control}
          >
            <BasicField
              inputProps={{
                type: "text",
                inputMode: "numeric",
                placeholder: "000000000000",
                maxLength: 12,
              }}
              classNames={{ container: "col-span-1" }}
            />
          </Field>
          <Field<TFieldValues>
            label="Ngày cấp CCCD"
            required
            size={isSM ? "small" : "default"}
            name="issuedAt"
            control={methods.control}
          >
            <DateField
              dateName="issuedAt.date"
              monthName="issuedAt.month"
              yearName="issuedAt.year"
              datePlaceholder={String(now.getDate()).padStart(2, "0")}
              monthPlaceholder={String(now.getMonth() + 1).padStart(2, "0")}
              yearPlaceholder={String(now.getFullYear())}
              classNames={{ container: "col-span-1" }}
              revalidate={revalidate}
              invalidMessage="Ngày cấp không hợp lệ"
              requiredMessage="Ngày cấp không được để trống"
            />
          </Field>
          <Field<TFieldValues>
            label="Mật khẩu"
            required
            size={isSM ? "small" : "default"}
            name="password"
            control={methods.control}
            description="Tối thiểu 6 ký tự, với ít nhất 1 chữ cái thường, 1 chữ cái in hoa, 1 chữ số (0-9) và 1 ký tự đặc biệt."
          >
            <PasswordField
              maxLength={128}
              placeholder="****************"
              hasStrength
              classNames={{ container: "col-span-full" }}
            />
          </Field>
          <Field<TFieldValues>
            label="Nhập lại mật khẩu"
            required
            size={isSM ? "small" : "default"}
            name="retypePassword"
            control={methods.control}
          >
            <PasswordField
              maxLength={128}
              placeholder="****************"
              classNames={{ container: "col-span-full" }}
            />
          </Field>
          <Field<TFieldValues>
            label="Tôi cam đoan những thông tin trên đây là đúng sự thật"
            size={isSM ? "small" : "default"}
            name="agree"
            control={methods.control}
          >
            <CheckboxField
              className="col-span-full"
              classNames={{ label: "font-normal text-foreground-200" }}
            />
          </Field>
        </div>
        <Dialog
          open={isOpenCompleteModal}
          onOpenChange={setIsOpenCompleteModal}
        >
          <Button
            hasLoader
            isLoading={isSubmitting}
            size={isSM ? "small" : "default"}
            type="submit"
            className="px-0 py-0 w-[18.75rem] h-[4.375rem] sm:w-full sm:h-[3.75rem]"
            // onAnimationComplete={() => {
            //   requestAnimationFrame(() => {
            //     buttonRef.current?.removeAttribute("style");
            //   });
            // }}
          >
            Đăng ký tài khoản
          </Button>
          <DialogContent
            aria-describedby={undefined}
            onInteractOutside={(e) => e.preventDefault()}
          >
            <VisuallyHidden asChild>
              <DialogTitle>
                Cảm ơn bạn đã đăng ký tài khoản Carshare
              </DialogTitle>
            </VisuallyHidden>
            <CompleteModal email={methods.getValues("email")} />
          </DialogContent>
        </Dialog>
      </motion.form>
    </FormProvider>
  );
}

function CompleteModal({ email }: { email: string }): React.JSX.Element {
  const [scope, animate] = useAnimate();
  const isSM = useMediaQuery({ maxWidth: 639 });

  React.useEffect(() => {
    const animateImage = async () => {
      await animate(
        scope.current,
        { x: 0, opacity: 1 },
        { type: "spring", duration: 1, bounce: 0.5 }
      );
      animate(
        scope.current,
        { scale: [1.07, 1.0, 1.08], rotate: [-1, 1.3, 0] },
        {
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
          duration: 1,
        }
      );
    };
    animateImage();
  }, []);

  return (
    <div className="w-[30rem] sm:w-full sm:max-w-[25rem] h-fit bg-background-950 rounded-4xl overflow-hidden">
      <div className="w-full h-fit bg-background-900 py-1">
        <figure>
          <motion.img
            ref={scope}
            src={checkEmailIllustrator}
            alt="illustrator about checking email"
            className="size-[8.75rem] sm:size-[6.25rem] object-contain mx-auto"
            initial={{ x: "12.5rem", opacity: 0 }}
          />
        </figure>
      </div>
      <div className="w-full h-fit space-y-8 sm:space-y-6 p-8 sm:p-4">
        <div className="w-full h-fit text-center space-y-4 sm:space-y-3">
          <h6 className="text-lg sm:text-base font-semibold text-white">
            Cảm ơn bạn đã đăng ký tài khoản Carshare!
          </h6>
          <p className="text-base sm:text-sm font-normal text-foreground-500">
            Một đường link xác nhận đang được gửi về địa chỉ email{" "}
            <span className="text-foreground-100">{obscureEmail(email)}</span>{" "}
            của bạn. Bạn vui lòng kiểm tra hòm thư để hoàn tất việc đăng ký nhé.
          </p>
        </div>
        <Button
          asChild
          intent="primary"
          size={isSM ? "small" : "default"}
          className="w-full py-0 h-[3.75rem] sm:h-[3.125rem]"
        >
          <Link to="/login">OK</Link>
        </Button>
      </div>
    </div>
  );
}
