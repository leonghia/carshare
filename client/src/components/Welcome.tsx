import logo from "../assets/images/logo.svg";
import { Button } from "./ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, FormField, FormItem } from "@/components/ui/form";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useNavigate } from "react-router";
import { useMediaQuery } from "react-responsive";

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Tên không được để trống" })
    .min(3, { message: "Tên phải chứa tối thiểu 3 ký tự" })
    .max(50, { message: "Tên chỉ được chứa tối đa 50 ký tự" })
    .regex(
      /^[a-zA-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/gm,
      { message: "Tên không hợp lệ" }
    ),
});

export function Welcome(): React.JSX.Element {
  const [isNext, setIsNext] = React.useState(false);
  let navigate = useNavigate();

  const isSM = useMediaQuery({ maxWidth: 639 });

  useEffect(() => {
    const guest_name = localStorage.getItem("guest_name");
    if (guest_name) navigate("/");
  }, []);

  return (
    <div className="w-full min-h-screen grid items-center justify-items-center bg-[linear-gradient(45deg,rgba(39,42,55,0.9)0%,rgba(39,42,55,0.8)100%),url('/src/assets/images/background_main_1920w.webp')] 2xl:bg-[linear-gradient(45deg,rgba(39,42,55,0.9)0%,rgba(39,42,55,0.8)100%),url('/src/assets/images/background_main_1535w.webp')] xl:bg-[linear-gradient(45deg,rgba(39,42,55,0.9)0%,rgba(39,42,55,0.8)100%),url('/src/assets/images/background_main_1279w.webp')] lg:bg-[linear-gradient(45deg,rgba(39,42,55,0.9)0%,rgba(39,42,55,0.8)100%),url('/src/assets/images/background_main_1023w.webp')] md:bg-[linear-gradient(45deg,rgba(39,42,55,0.9)0%,rgba(39,42,55,0.8)100%),url('/src/assets/images/background_main_767w.webp')] sm:bg-[linear-gradient(45deg,rgba(39,42,55,0.9)0%,rgba(39,42,55,0.8)100%),url('/src/assets/images/background_main_639w.webp')] bg-cover bg-center bg-no-repeat sm:px-4">
      <div className="space-y-12 sm:space-y-8 w-96 sm:w-full">
        <figure>
          <img
            src={logo}
            alt="carshare logo"
            className="h-8 sm:h-5 w-auto object-contain mx-auto"
          />
        </figure>
        <AnimatePresence mode="wait">
          {isNext ? (
            <MotionHello
              key="hello"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              isSM={isSM}
            />
          ) : (
            <MotionEnterName
              key="enterName"
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: "spring", duration: 0.3 }}
              onNext={() => setIsNext(true)}
              isSM={isSM}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

type EnterNameProps = {
  onNext: () => void;
  isSM: boolean;
};

const EnterName = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & EnterNameProps
>(({ onNext, isSM, ...props }, ref) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
    shouldFocusError: false,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    localStorage.setItem("guest_name", values.name);
    onNext();
  };

  return (
    <div
      ref={ref}
      className="space-y-6 mx-auto sm:space-y-3 w-full sm:max-w-80"
      {...props}
    >
      <h1 className="text-lg sm:text-base font-semibold text-white text-center">
        Chúng mình có thể gọi bạn là?
      </h1>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-12 sm:space-y-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem
                state={form.getFieldState("name").error ? "error" : "default"}
                size={isSM ? "small" : "default"}
                label="Tên của bạn"
                required
                placeholder="VD. Nguyễn Văn A"
                field={field}
              />
            )}
          />
          <Button
            intent="secondary"
            size={isSM ? "small" : "default"}
            type="submit"
            className="px-0 w-40 block mx-auto"
          >
            Tiếp theo
          </Button>
        </form>
      </FormProvider>
    </div>
  );
});

const MotionEnterName = motion.create(EnterName);

const Hello = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { isSM: boolean }
>(({ isSM, ...props }, ref) => {
  const guestName = localStorage.getItem("guest_name")!;

  return (
    <div ref={ref} className="space-y-12 sm:space-y-8 w-full" {...props}>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 1, delay: 0.3, bounce: 0.75 }}
        className="mx-auto size-60 sm:size-[7.5rem] bg-[url('/src/assets/images/hello_illustrator_240w.webp')] sm:bg-[url('/src/assets/images/hello_illustrator_120w.webp')] bg-contain bg-center bg-no-repeat"
      ></motion.div>
      <div className="space-y-2">
        <p className="text-base sm:text-sm font-medium text-foreground-500 text-center">
          Chào {guestName} 👋
        </p>
        <h1 className="text-lg sm:text-base font-semibold text-white text-center">
          Chào mừng bạn đến với Carshare!
        </h1>
      </div>
      <div className="text-center">
        <Button
          asChild
          intent="primary"
          size={isSM ? "small" : "default"}
          className={`px-0 ${isSM ? "w-40" : "w-[11.25rem]"}`}
        >
          <Link to="/">Bắt đầu</Link>
        </Button>
      </div>
    </div>
  );
});

const MotionHello = motion.create(Hello);
