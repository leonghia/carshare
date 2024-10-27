import { useState } from 'react';
import classes from './RegisterForm.module.scss';
import { IconCheck, IconX } from '@tabler/icons-react';
import { Calendar1, Eye, EyeSlash } from 'iconsax-react';
import { Anchor, Button, PasswordInput, Popover, Progress, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useField, useForm } from '@mantine/form';
import { useDisclosure, useTimeout } from '@mantine/hooks';
import Assurance from './Assurance/Assurance';

const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const numberRegex = /^\d+$/;

const PasswordRequirement = ({ meets, label }: { meets: boolean; label: string }) => {
  return (
    <div className={classes.passwordRequirement} data-meets={meets}>
      {meets ? <IconCheck /> : <IconX />}{' '}
      <span className={classes.passwordRequirementLabel}>{label}</span>
    </div>
  );
};

const passwordRequirements = [
  { re: /[0-9]/, label: 'Bao gồm một chữ số (0-9)' },
  { re: /[a-z]/, label: 'Bao gồm một chữ cái viết thường' },
  { re: /[A-Z]/, label: 'Bao gồm một chữ cái viết hoa' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Bao gồm một ký tự đặc biệt' },
];

const getPasswordStrength = (password: string) => {
  let multiplier = password.length > 5 ? 0 : 1;

  passwordRequirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (passwordRequirements.length + 1)) * multiplier, 10);
};

export default function RegisterForm({ onSubmitted }: { onSubmitted: (email: string) => void }) {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [isSubmitting, { open: turnOnSubmitting, close: turnOffSubmitting }] = useDisclosure(false);

  const { start: startSubmitting, clear: clearSubmitting } = useTimeout(() => {
    turnOffSubmitting();
    onSubmitted(form.getValues().email);
  }, 3000);

  const passwordField = useField({
    initialValue: '',
    validate: (value) => {
      if (value.trim().length === 0) return 'Mật khẩu không được để trống';
      if (getPasswordStrength(value) <= 50) return 'Mật khẩu của bạn quá yếu';
      return null;
    },
  });

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
      assured: false,
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
      retypePassword: (value: string) => {
        if (value.trim().length === 0) return 'Mật khẩu nhập lại không được để trống';
        if (value.trim() !== passwordField.getValue()) return 'Mật khẩu nhập lại phải trùng khớp';
        return null;
      },
      assured: (value: boolean) => {
        if (!value) return 'Bạn phải đồng ý cam đoan trước khi đăng ký';
        return null;
      },
    },
  });

  // const [submittedValues, setSubmittedValues] = useState<typeof form.values | null>(null);

  const strength = getPasswordStrength(passwordField.getValue());

  const checkMarkups = passwordRequirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(passwordField.getValue())}
    />
  ));

  const handleSubmit = async (values: typeof form.values) => {
    const result = await passwordField.validate();
    if (result) return;
    // console.log(values);
    // setSubmittedValues(values);
    // const finalValues = { ...values, password: passwordField.getValue() };
    // console.log(finalValues);
    turnOnSubmitting();
    startSubmitting();
  };

  const handleError = async (error: typeof form.errors) => {
    await passwordField.validate();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit, handleError)} className={classes.form}>
      <TextInput
        withAsterisk
        label="Họ tên"
        placeholder="Nhập họ tên đầy đủ của bạn..."
        {...form.getInputProps('fullName')}
        key={form.key('fullName')}
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
        {...form.getInputProps('email')}
        key={form.key('email')}
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
        {...form.getInputProps('phoneNumber')}
        key={form.key('phoneNumber')}
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
          {...form.getInputProps('nationalID')}
          key={form.key('nationalID')}
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
          {...form.getInputProps('publishedDate')}
          key={form.key('publishedDate')}
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
              dropdown: classes.datePickerPopoverDropdown,
            },
          }}
        />
      </div>
      <Popover
        opened={popoverOpened}
        // opened={true}
        position="bottom"
        width="target"
        transitionProps={{ transition: 'pop' }}
        classNames={{ dropdown: classes.passwordPopoverDropdown }}
      >
        <Popover.Target>
          <div
            onFocusCapture={() => setPopoverOpened(true)}
            onBlurCapture={() => setPopoverOpened(false)}
          >
            <PasswordInput
              withAsterisk
              label="Mật khẩu"
              placeholder="Nhập mật khẩu bạn muốn đặt..."
              visibilityToggleIcon={VisibilityToggleIcon}
              {...passwordField.getInputProps()}
              // key={form.key('password')}
              // value={passwordValue}
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
          </div>
        </Popover.Target>
        <Popover.Dropdown>
          <Progress
            value={strength}
            size={5}
            classNames={{
              root: classes.passwordStrengthProgressRoot,
              section: classes.progressSection,
            }}
            data-strength={strength === 100 ? 'strong' : strength > 50 ? 'average' : 'weak'}
          />
          <PasswordRequirement
            label="Độ dài tối thiểu 6 ký tự"
            meets={passwordField.getValue().length > 5}
          />
          {checkMarkups}
        </Popover.Dropdown>
      </Popover>
      <PasswordInput
        withAsterisk
        label="Nhập lại mật khẩu"
        placeholder="Nhập lại mật khẩu đã điền ở trên..."
        visibilityToggleIcon={VisibilityToggleIcon}
        {...form.getInputProps('retypePassword')}
        key={form.key('retypePassword')}
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
      <Assurance
        keyVal={form.key('assured')}
        isChecked={form.getValues().assured}
        {...form.getInputProps('assured')}
      />
      <div className={classes.submitAndLogin}>
        <Button
          type="submit"
          loading={isSubmitting}
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

const VisibilityToggleIcon = ({ reveal }: { reveal: boolean }) => {
  return reveal ? <EyeSlash variant="Outline" /> : <Eye variant="Outline" />;
};
