import { z } from "zod";
import curvedDivider from "../assets/images/curved_divider_1.svg";
import logo from "../assets/images/logo.svg";
import { Button } from "./ui/button";

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
      <div className="relative z-10 w-full min-h-screen bg-[linear-gradient(238deg,rgba(39,42,55,0.65)0%,rgba(39,42,55,1)40%)]">
        <div className="relative top-[6.25rem] left-[10%] w-[34rem] space-y-12">
          <div className="w-full space-y-4">
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
          </div>
          <SignupForm />
        </div>
        <figure className="absolute right-12 bottom-10">
          <img src={logo} alt="logo" className="h-16 object-contain" />
        </figure>
      </div>
      <div className="absolute z-0 top-0 right-0 w-[58%] h-full bg-[url('/src/assets/images/background_side_default.webp')] bg-cover bg-right"></div>
    </div>
  );
}

const formSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, { message: "Họ tên không được để trống" })
    .min(3, { message: "Họ tên phải chứa tối thiểu 3 ký tự" })
    .max(50, { message: "Họ tên chỉ được chứa tối đa 50 ký tự" })
    .regex(
      /^[a-zA-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/gm,
      { message: "Họ tên không hợp lệ" }
    ),
  phone: z
    .string()
    .trim()
    .min(1, { message: "Số điện thoại không được để trống" })
    .max(11, { message: "Số điện thoại chỉ chứa tối đa 11 số" })
    .regex(/^\d+$/, { message: "Số điện thoại không hợp lệ" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email không được để trống" })
    .email({ message: "Địa chỉ email không hợp lệ" }),
  nationalID: z
    .string()
    .trim()
    .min(1, { message: "Số CCCD không được để trống" })
    .max(11, { message: "Số CCCD chỉ chứa tối đa 11 số" })
    .regex(/^\d+$/, { message: "Số CCCD không hợp lệ" }),
  publishedDate: z
    .string()
    .trim()
    .min(1, { message: "Ngày cấp CCCD không được để trống" })
    .date("Ngày cấp CCCD không hợp lệ"),
  password: z
    .string()
    .trim()
    .min(1, { message: "Mật khẩu không được để trống" })
    .min(6, { message: "Mật khẩu phải chứa tối thiểu 6 ký tự" })
    .max(64, { message: "Mật khẩu chỉ được chứa tối đa 64 ký tự" }),
});

function SignupForm(): JSX.Element {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-2 gap-6"></div>
      <Button className="px-0 py-0 w-[18.75rem] h-[4.375rem]">
        Đăng ký tài khoản
      </Button>
    </div>
  );
}