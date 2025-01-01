import { z } from "zod";
import curvedDivider from "../assets/images/curved_divider_1.svg";
import logo from "../assets/images/logo.svg";
import { Button } from "./ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { Field } from "./ui/field";
import { BasicField } from "./ui/basicField";

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
          <Field
            control={form.control}
            name="fullName"
            label="Họ tên"
            required
            size="default"
            className="col-span-1"
          >
            <BasicField placeholder="Nguyễn Văn A" type="text" />
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
