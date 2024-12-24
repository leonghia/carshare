import logo from "../assets/images/logo.svg";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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

export function Welcome(): JSX.Element {
  return (
    <div className="w-full min-h-screen grid items-center justify-items-center bg-[linear-gradient(45deg,rgba(39,42,55,1)0%,rgba(39,42,55,0.95)100%),url('/src/assets/images/background_main_1920w.webp')] bg-cover bg-center bg-no-repeat">
      <div className="space-y-12">
        <figure>
          <img
            src={logo}
            alt="carshare logo"
            className="h-8 w-auto object-contain mx-auto"
          />
        </figure>
        <div className="space-y-6">
          <h1 className="text-lg font-semibold text-white text-center">
            Chúng mình có thể gọi bạn là?
          </h1>
          <EnterName />
        </div>
      </div>
    </div>
  );
}

function EnterName(): JSX.Element {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
    shouldFocusError: false,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem
              state={
                form.formState.isSubmitted && !form.formState.isValid
                  ? "error"
                  : "default"
              }
              message={<FormMessage />}
              label={<FormLabel required>Tên của bạn</FormLabel>}
            >
              <FormControl>
                <Input placeholder="VD. Nguyễn Văn A" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          intent="secondary"
          type="submit"
          className="px-0 w-40 block mx-auto"
        >
          Tiếp theo
        </Button>
      </form>
    </Form>
  );
}
