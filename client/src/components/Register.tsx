import { z } from "zod";
import curvedDivider from "../assets/images/curved_divider_1.svg";
import logo from "../assets/images/logo.svg";
import { Button } from "./ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { Field } from "./ui/field";
import { BasicField } from "./ui/basicField";
import { DatePickerField } from "./ui/datePickerField";
import { PasswordField } from "./ui/passwordField";
import { calculatePasswordStrength } from "@/lib/utils";

export function Register(): JSX.Element {
  return (
    <div className="w-full min-h-screen relative">
      {/* Right */}
      <div className="absolute z-0 top-0 right-0 w-[58%] h-full bg-[url('/src/assets/images/background_side_default.webp')] bg-cover bg-right"></div>
      {/* Container */}
      <div className="grid justify-items-center items-center px-16 py-20 overflow-x-hidden relative z-10 w-full min-h-screen bg-[linear-gradient(238deg,rgba(39,42,55,0.65)0%,rgba(39,42,55,1)40%)]">
        <div className="w-full max-w-7xl h-fit">
          <div className="w-[34rem] h-fit space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -150 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", duration: 1 }}
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
        </div>
      </div>
      {/* Vector */}
      <figure className="absolute top-0 left-[calc(50%+1.875rem)] -translate-x-1/2 z-20 w-fit h-full">
        <img
          src={curvedDivider}
          alt="divider"
          className="object-fill h-full w-[17.25rem]"
        />
      </figure>
      {/* Logo */}
      <motion.figure
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", duration: 1 }}
        className="absolute right-12 bottom-10 z-20"
      >
        <img src={logo} alt="logo" className="h-16 object-contain" />
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
    publishedDay: z.string().trim(),
    publishedMonth: z.string().trim(),
    publishedYear: z.string().trim(),
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
  .superRefine(
    (
      { password, retypePassword, publishedDay, publishedMonth, publishedYear },
      ctx
    ) => {
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

type TFieldValues = z.infer<typeof formSchema>;

function SignupForm(): JSX.Element {
  const methods = useForm<z.infer<typeof formSchema>>({
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
      agree: false,
    },
    shouldFocusError: false,
  });

  const onValid = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onValid)}
        className="w-full space-y-12"
      >
        <div className="w-full grid grid-cols-2 gap-6">
          <Field<TFieldValues>
            label="Họ tên"
            required
            size="default"
            name="fullName"
            className="col-span-1"
          >
            <BasicField
              control={methods.control}
              name="fullName"
              inputProps={{
                type: "text",
                placeholder: "Nguyễn Văn A",
                maxLength: 64,
              }}
            />
          </Field>
          <Field<TFieldValues>
            label="Số điện thoại"
            required
            size="default"
            name="phoneNumber"
            className="col-span-1"
          >
            <BasicField
              control={methods.control}
              name="phoneNumber"
              inputProps={{
                type: "tel",
                inputMode: "tel",
                placeholder: "0123 456 789",
                maxLength: 12,
              }}
            />
          </Field>
          <Field<TFieldValues>
            label="Email"
            required
            size="default"
            name="email"
            className="col-span-full"
          >
            <BasicField
              control={methods.control}
              name="email"
              inputProps={{
                type: "email",
                placeholder: "abc@email.com",
                maxLength: 254,
              }}
            />
          </Field>
          <Field<TFieldValues>
            label="Số CCCD"
            required
            size="default"
            name="nationalID"
            className="col-span-1"
          >
            <BasicField
              control={methods.control}
              name="nationalID"
              inputProps={{
                type: "text",
                inputMode: "numeric",
                placeholder: "000000000000",
                maxLength: 12,
              }}
            />
          </Field>
          <Field<TFieldValues>
            label="Ngày cấp CCCD"
            required
            size="default"
            name="publishedDay"
            className="col-span-1"
          >
            <DatePickerField
              control={methods.control}
              dayName="publishedDay"
              monthName="publishedMonth"
              yearName="publishedYear"
              dayPlaceholder="01"
              monthPlaceholder="01"
              yearPlaceholder="2020"
            />
          </Field>
          <Field<TFieldValues>
            label="Mật khẩu"
            required
            size="default"
            name="password"
            className="col-span-full"
            description="Tối thiểu tối thiểu 6 ký tự, với ít nhất 1 chữ cái thường, 1 chữ cái in hoa, 1 chữ số (0-9) và 1 ký tự đặc biệt."
          >
            <PasswordField
              control={methods.control}
              name="password"
              maxLength={128}
              placeholder="****************"
              hasStrength
            />
          </Field>
          <Field<TFieldValues>
            label="Nhập lại mật khẩu"
            required
            size="default"
            name="retypePassword"
            className="col-span-full"
          >
            <PasswordField
              control={methods.control}
              name="retypePassword"
              maxLength={128}
              placeholder="****************"
            />
          </Field>
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
