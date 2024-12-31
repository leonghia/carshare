import { z } from "zod";
import curvedDivider from "../assets/images/curved_divider_1.svg";
import logo from "../assets/images/logo.svg";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider } from "./ui/form";
import { motion } from "motion/react";
import { BasicField } from "./ui/basicField";
import { PasswordField } from "./ui/passwordField";
import { DatepickerField } from "./ui/datepickerField";

export function Register(): JSX.Element {
  return (
    <div className="w-full min-h-screen relative">
      <figure className="absolute top-0 left-[45%] z-20 w-fit h-full">
        <img
          src={curvedDivider}
          alt="divider"
          className="object-cover w-[17.25rem] h-full"
        />
      </figure>
      <div className="overflow-x-hidden relative z-10 w-full min-h-screen bg-[linear-gradient(238deg,rgba(39,42,55,0.65)0%,rgba(39,42,55,1)40%)]">
        <div className="relative top-[6.25rem] left-[10%] w-[34rem] space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -150, filter: "blur(0.25rem)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0)" }}
            transition={{ type: "spring", duration: 1, filter: { bounce: 0 } }}
            className="w-full space-y-4"
          >
            <div className="flex gap-1">
              <h1 className="text-4xl font-bold text-white shrink-0">
                Đăng ký tài khoản
              </h1>
              <span className="inline-block translate-y-6 size-[0.625rem] bg-primary-500 rounded-full"></span>
            </div>
            <p className="font-normal text-sm text-foreground-500">
              Bạn đã có tài khoản?{" "}
              <a
                href="/login"
                className="font-medium text-primary-500 hover:text-primary-300 transition-all duration-300 ease-out"
              >
                Đăng nhập ngay
              </a>
            </p>
          </motion.div>
          <SignupForm />
        </div>
        <motion.figure
          initial={{ opacity: 0, x: 100, filter: "blur(0.25rem)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0)" }}
          transition={{ type: "spring", duration: 1, filter: { bounce: 0 } }}
          className="absolute right-12 bottom-10"
        >
          <img src={logo} alt="logo" className="h-16 object-contain" />
        </motion.figure>
      </div>
      <div className="absolute z-0 top-0 right-0 w-[58%] h-full bg-[url('/src/assets/images/background_side_default.webp')] bg-cover bg-right"></div>
    </div>
  );
}

const formSchema = z
  .object({
    fullName: z
      .string({ required_error: "Họ tên không được để trống" })
      .min(3, { message: "Họ tên phải chứa tối thiểu 3 ký tự" })
      .max(50, { message: "Họ tên chỉ được chứa tối đa 50 ký tự" })
      .regex(
        /^[a-zA-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/gm,
        { message: "Họ tên không hợp lệ" }
      ),
    phoneNumber: z
      .string({ required_error: "Số điện thoại không được để trống" })
      .max(11, { message: "Số điện thoại không chứa quá 11 số" })
      .regex(/^\d+$/, { message: "Số điện thoại không hợp lệ" }),
    email: z
      .string({ required_error: "Email không được để trống" })
      .max(254, { message: "Email không chứa quá 254 ký tự" })
      .email({ message: "Địa chỉ email không hợp lệ" }),
    nationalID: z
      .string({ required_error: "Số CCCD không được để trống" })
      .max(12, { message: "Số CCCD không chứa quá 12 số" })
      .regex(/^\d+$/, { message: "Số CCCD không hợp lệ" }),
    publishedDay: z.string().trim(),
    publishedMonth: z.string().trim(),
    publishedYear: z.string().trim(),
    password: z
      .string({ required_error: "Mật khẩu không được để trống" })
      .max(128, { message: "Mật khẩu không chứa quá 128 ký tự" }),
    retypePassword: z.string({
      required_error: "Mật khẩu nhập lại không được để tróng",
    }),
  })
  .superRefine(
    (
      { password, retypePassword, publishedDay, publishedMonth, publishedYear },
      ctx
    ) => {
      if (password !== retypePassword) {
        ctx.addIssue({
          code: "custom",
          message: "Mật khẩu nhập lại phải trùng khớp",
          path: ["retypePassword"],
        });
      }
      if (
        publishedDay.length === 0 ||
        publishedMonth.length === 0 ||
        publishedYear.length === 0
      ) {
        ctx.addIssue({
          code: "custom",
          message: "Ngày cấp CCCD không được để trống",
          path: ["publishedDay"],
        });
      }

      if (
        !z
          .string()
          .date()
          .safeParse(
            `${publishedYear}-${publishedMonth.padStart(
              2,
              "0"
            )}-${publishedDay.padStart(2, "0")}`
          ).success
      ) {
        ctx.addIssue({
          code: "invalid_date",
          message: "Ngày cấp CCCD không hợp lệ",
          path: ["publishedDay"],
        });
      }
    }
  );

function SignupForm(): JSX.Element {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      nationalID: "",
      publishedDay: "",
      publishedMonth: "",
      publishedYear: "",
      password: "",
      retypePassword: "",
    },
    shouldFocusError: false,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-12"
      >
        <div className="w-full grid grid-cols-2 gap-6">
          <BasicField
            control={form.control}
            name="fullName"
            state={form.getFieldState("fullName").error ? "error" : "default"}
            size="default"
            label="Họ tên"
            required
            placeholder="Nguyễn Văn A"
            type="text"
            className="col-span-1"
          />
          <BasicField
            control={form.control}
            name="phoneNumber"
            state={
              form.getFieldState("phoneNumber").error ? "error" : "default"
            }
            size="default"
            label="Số điện thoại"
            required
            leftText="+84"
            placeholder="123 456 789"
            type="tel"
            className="col-span-1"
          />
          <BasicField
            control={form.control}
            name="email"
            state={form.getFieldState("email").error ? "error" : "default"}
            size="default"
            label="Email"
            required
            placeholder="abc@email.com"
            type="email"
            className="col-span-full"
          />
          <BasicField
            control={form.control}
            name="nationalID"
            state={form.getFieldState("nationalID").error ? "error" : "default"}
            size="default"
            label="Số CCCD"
            required
            placeholder="000000000000"
            type="tel"
            className="col-span-1"
          />
          <DatepickerField
            control={form.control}
            dayFieldName="publishedDay"
            monthFieldName="publishedMonth"
            yearFieldName="publishedYear"
            dayPlaceholder="01"
            monthPlaceholder="01"
            yearPlaceholder="2020"
            size="default"
            state={
              form.getFieldState("publishedDay").error ? "error" : "default"
            }
            className="col-span-1"
            label="Ngày cấp CCCD"
            required
          />
          <PasswordField
            control={form.control}
            name="password"
            state={form.getFieldState("password").error ? "error" : "default"}
            size="default"
            label="Mật khẩu"
            required
            placeholder="****************"
            className="col-span-full"
            description="Tối thiểu 6 ký tự, với ít nhất 1 chữ cái in hoa, 1 chữ cái thường, 1 chữ số (0-9) và 1 ký tự đặc biệt."
            hasStrength
          />
          <PasswordField
            control={form.control}
            name="retypePassword"
            state={
              form.getFieldState("retypePassword").error ? "error" : "default"
            }
            size="default"
            label="Nhập lại mật khẩu"
            required
            placeholder="****************"
            className="col-span-full"
          />
        </div>
        <Button
          type="submit"
          className="block px-0 py-0  w-[18.75rem] h-[4.375rem]"
        >
          Đăng ký tài khoản
        </Button>
      </form>
    </FormProvider>
  );
}
