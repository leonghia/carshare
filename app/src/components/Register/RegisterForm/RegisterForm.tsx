import classes from './RegisterForm.module.scss';
import { IconCheck } from '@tabler/icons-react';
import { Calendar1, Eye, EyeSlash } from 'iconsax-react';
import { Anchor, Button, Checkbox, CheckboxProps, PasswordInput, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';

const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const numberRegex = /^\d+$/;

export default function RegisterForm() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      nationalID: '',
      publishedDate: null,
      password: '',
      retypePassword: '',
      assurance: false,
    },
    validate: {
      fullName: (value: string) => {
        if (value.trim().length === 0) return 'Họ tên không được để trống';
        return null;
      },
      email: (value: string) => {
        if (value.trim().length === 0) return 'Địa chỉ email không được để trống';
        if (!value.trim().toLowerCase().match(emailRegex)) return 'Địa chỉ email không hợp lệ';
        return null;
      },
      phoneNumber: (value: string) => {
        if (value.trim().length === 0) return 'Số điện thoại không được để trống';
        if (!value.trim().match(numberRegex)) return 'Số điện thoại không hợp lệ';
        return null;
      },
      nationalID: (value: string) => {
        if (value.trim().length === 0) return 'Số CCCD không được để trống';
        if (!value.trim().match(numberRegex)) return 'Số điện thoại không hợp lệ';
        return null;
      },
      publishedDate: (value: Date) => {
        if (!value) return 'Ngày cấp CCCD không được để trống';
        return null;
      },
      password: (value: string) => {
        if (value.trim().length === 0) return 'Mật khẩu không được để trống';
        return null;
      },
      retypePassword: (value: string) => {
        if (value.trim().length === 0) return 'Mật khẩu nhập lại không được để trống';
        if (value.trim() !== form.getValues().password) return 'Mật khẩu nhập lại phải trùng khớp';
        return null;
      },
      assurance: (value: boolean) => {
        if (!value) return 'Bạn phải đồng ý cam đoan trước khi đăng ký';
        return null;
      },
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log(values);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className={classes.form}>
      <TextInput
        withAsterisk
        label="Họ tên"
        placeholder="Nhập họ tên đầy đủ của bạn..."
        key={form.key('fullName')}
        {...form.getInputProps('fullName')}
        classNames={{
          root: classes.textInputRoot,
          wrapper: classes.textInputWrapper,
          label: classes.textInputLabel,
          required: classes.textInputRequired,
          input: classes.textInputInput,
          error: classes.textInputError,
        }}
      />
      <TextInput
        withAsterisk
        label="Email"
        placeholder="Nhập địa chỉ email của bạn..."
        key={form.key('email')}
        {...form.getInputProps('email')}
        classNames={{
          root: classes.textInputRoot,
          wrapper: classes.textInputWrapper,
          label: classes.textInputLabel,
          required: classes.textInputRequired,
          input: classes.textInputInput,
          error: classes.textInputError,
        }}
      />
      <TextInput
        type="tel"
        leftSection={'(+84)'}
        withAsterisk
        label="Số điện thoại"
        placeholder="Nhập số điện thoại của bạn..."
        key={form.key('phoneNumber')}
        {...form.getInputProps('phoneNumber')}
        classNames={{
          root: classes.phoneNumberInputRoot,
          wrapper: classes.textInputWrapper,
          label: classes.textInputLabel,
          required: classes.textInputRequired,
          input: classes.textInputInput,
          error: classes.textInputError,
          section: classes.textInputSection,
        }}
      />
      <div className={classes.nationalIDAndPublishedDate}>
        <TextInput
          type="tel"
          withAsterisk
          label="Căn cước công dân"
          placeholder="Nhập số CCCD của bạn..."
          key={form.key('nationalID')}
          {...form.getInputProps('nationalID')}
          classNames={{
            root: classes.textInputRoot,
            wrapper: classes.textInputWrapper,
            label: classes.textInputLabel,
            required: classes.textInputRequired,
            input: classes.textInputInput,
            error: classes.textInputError,
          }}
        />
        <DatePickerInput
          rightSection={<Calendar1 variant="Outline" />}
          rightSectionPointerEvents="none"
          label="Ngày cấp"
          withAsterisk
          placeholder="Nhập ngày cấp CCCD..."
          valueFormat="DD/MM/YYYY"
          key={form.key('publishedDate')}
          {...form.getInputProps('publishedDate')}
          classNames={{
            root: classes.datePickerInputRoot,
            section: classes.datePickerInputSection,
            input: classes.datePickerInputInput,
            placeholder: classes.datePickerInputPlaceholder,
            error: classes.datePickerInputError,
            label: classes.datePickerInputLabel,
            wrapper: classes.datePickerInputWrapper,
            day: classes.datePickerInputDay,
            required: classes.datePickerInputRequired,
          }}
          popoverProps={{
            classNames: {
              dropdown: classes.popoverDropdown,
            },
          }}
        />
      </div>
      <PasswordInput
        withAsterisk
        label="Mật khẩu"
        placeholder="Nhập mật khẩu bạn muốn đặt..."
        defaultValue=""
        visibilityToggleIcon={VisibilityToggleIcon}
        key={form.key('password')}
        {...form.getInputProps('password')}
        classNames={{
          root: classes.passwordInputRoot,
          input: classes.passwordInputInput,
          innerInput: classes.passwordInputInnerInput,
          section: classes.passwordInputSection,
          visibilityToggle: classes.passwordInputVisibilityToggle,
          wrapper: classes.passwordInputWrapper,
          label: classes.passwordInputLabel,
          required: classes.passwordInputRequired,
          error: classes.passwordInputError,
        }}
      />
      <PasswordInput
        withAsterisk
        label="Nhập lại mật khẩu"
        placeholder="Nhập lại mật khẩu mà bạn đã điền ở trên..."
        defaultValue=""
        visibilityToggleIcon={VisibilityToggleIcon}
        key={form.key('retypePassword')}
        {...form.getInputProps('retypePassword')}
        classNames={{
          root: classes.passwordInputRoot,
          input: classes.passwordInputInput,
          innerInput: classes.passwordInputInnerInput,
          section: classes.passwordInputSection,
          visibilityToggle: classes.passwordInputVisibilityToggle,
          wrapper: classes.passwordInputWrapper,
          label: classes.passwordInputLabel,
          required: classes.passwordInputRequired,
          error: classes.passwordInputError,
        }}
      />
      <Checkbox
        icon={CheckboxIcon}
        label="Tôi cam đoan những thông tin được kê khai ở trên là đúng sự thật. Nếu sai, tôi sẵn sàng chịu mọi trách nhiệm liên quan."
        key={form.key('assurance')}
        {...form.getInputProps('assurance')}
        classNames={{
          root: classes.checkboxRoot,
          inner: classes.checkboxInner,
          input: classes.checkboxInput,
          label: classes.checkboxLabel,
          error: classes.checkboxError,
          icon: classes.checkboxIcon,
        }}
      />
      <div className={classes.submitAndLogin}>
        <Button
          type="submit"
          classNames={{
            root: classes.submitButtonRoot,
            label: classes.buttonLabel,
          }}
        >
          Đăng ký
        </Button>
        <p className={classes.login}>
          Bạn đã có tài khoản?{' '}
          <Anchor href="/login" underline="never" classNames={{ root: classes.anchorRoot }}>
            Đăng nhập ngay
          </Anchor>
        </p>
      </div>
    </form>
  );
}

const CheckboxIcon: CheckboxProps['icon'] = ({ indeterminate, ...others }) => (
  <IconCheck {...others} />
);

const VisibilityToggleIcon = ({ reveal }: { reveal: boolean }) => {
  return reveal ? <EyeSlash variant="Outline" /> : <Eye variant="Outline" />;
};
