import { useState } from 'react';
import classes from './RegisterForm.module.scss';
import { Eye, EyeSlash } from 'iconsax-react';
import { PasswordInput, TextInput } from '@mantine/core';
import { DateValue } from '@mantine/dates';
import { useForm } from '@mantine/form';
import AgreementCheckbox from './AgreementCheckbox/AgreementCheckbox';
import PasswordInputWithStrength, {
  getPasswordStrength,
} from './PasswordInputWithStrength/PasswordInputWithStrength';
import PublishedDatePickerInput from './PublishedDatePickerInput/PublishedDatePickerInput';
import SubmitButton from './SubmitButton/SubmitButton';

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function VisibilityToggleIcon({ reveal }: { reveal: boolean }) {
  return reveal ? <EyeSlash variant="Bold" /> : <Eye variant="Bold" />;
}

export default function RegisterForm() {
  const [nationalIdPublishedDate, setNationalIdPublishedDate] = useState<DateValue | null>(null);

  // console.log(nationalIdPublishedDate);

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      nationalId: '',
      publishedDate: '',
      password: '',
      retypePassword: '',
      agreement: false,
    },

    validate: {
      fullName: (value: string) => {
        if (value.trim().length == 0) return 'Họ tên không được để trống';
        return null;
      },
      email: (value: string) => {
        if (value.trim().length == 0) return 'Địa chỉ email không được để trống';
        else if (!value.trim().toLowerCase().match(emailRegex)) return 'Địa chỉ email không hợp lệ';
        return null;
      },
      phoneNumber: (value: string) => {
        if (value.trim().length == 0) return 'Số điện thoại không được để trống';
        return null;
      },
      nationalId: (value: string) => {
        if (value.trim().length == 0) return 'Số CCCD không được để trống';
        return null;
      },
      publishedDate: (value: string) => {
        if (!value) {
          console.log(value);
          return 'Ngày cấp CCCD không được để trống';
        }
        return null;
      },
      password: (value: string) => {
        const passwordStrength = getPasswordStrength(value);
        if (value.trim().length == 0) return 'Mật khẩu không được để trống';
        else if (passwordStrength <= 50) return 'Mật khẩu không đạt yêu cầu';
        return null;
      },
      retypePassword: (value, values) => {
        if (value.trim().length == 0) return 'Mật khẩu nhập lại không được để trống';
        else if (value.trim() !== values.password) return 'Mật khẩu nhập lại phải trùng khớp';
        return null;
      },
      agreement: (value: boolean) => {
        return value ? null : 'Bạn phải đồng ý cam đoan trước khi đăng ký';
      },
    },
  });

  return (
    <form className={classes.form} onSubmit={form.onSubmit(console.log)}>
      {/* Full name */}
      <div className={classes['input-group']}>
        <label htmlFor="full_name" className={classes.label}>
          Họ tên <span className={classes.asterisk}>*</span>
        </label>
        <TextInput
          placeholder="Nhập họ tên đầy đủ của bạn..."
          id="full_name"
          classNames={{
            root: classes.root,
            wrapper: classes.wrapper,
            input: classes.input,
            error: classes.error,
          }}
          key={form.key('fullName')}
          {...form.getInputProps('fullName')}
        />
      </div>
      {/* Email */}
      <div className={classes['input-group']}>
        <label htmlFor="email" className={classes.label}>
          Email <span className={classes.asterisk}>*</span>
        </label>
        <TextInput
          placeholder="Nhập địa chỉ email của bạn..."
          id="email"
          type="email"
          classNames={{
            root: classes.root,
            wrapper: classes.wrapper,
            input: classes.input,
            error: classes.error,
          }}
          key={form.key('email')}
          {...form.getInputProps('email')}
        />
      </div>
      {/* Phone number */}
      <div className={classes['input-group']}>
        <label htmlFor="phone_number" className={classes.label}>
          Số điện thoại <span className={classes.asterisk}>*</span>
        </label>
        <TextInput
          leftSection={'(+84)'}
          placeholder="Nhập số điện thoại của bạn..."
          id="phone_number"
          type="number"
          classNames={{
            root: classes.root,
            wrapper: classes.wrapper,
            input: classes['input--phone-number'],
            section: classes['section--phone-number'],
            error: classes.error,
          }}
          key={form.key('phoneNumber')}
          {...form.getInputProps('phoneNumber')}
        />
      </div>
      {/* National ID & Published date */}
      <div className={classes['national-id-n-published-date']}>
        {/* National ID */}
        <div className={classes['input-group']}>
          <label htmlFor="national_id" className={classes.label}>
            Căn cước công dân <span className={classes.asterisk}>*</span>
          </label>
          <TextInput
            placeholder="Nhập số CCCD của bạn..."
            id="national_id"
            type="number"
            classNames={{
              root: classes.root,
              wrapper: classes.wrapper,
              input: classes.input,
              error: classes.error,
            }}
            key={form.key('nationalId')}
            {...form.getInputProps('nationalId')}
          />
        </div>
        {/* Published date */}
        <div className={classes['input-group']}>
          <label htmlFor="published_date" className={classes.label}>
            Ngày cấp <span className={classes.asterisk}>*</span>
          </label>
          <PublishedDatePickerInput
            date={nationalIdPublishedDate}
            keyValue={form.key('publishedDate')}
            {...form.getInputProps('publishedDate')}
            onChange={(date: DateValue) => {
              setNationalIdPublishedDate(date);
              form.setFieldValue('publishedDate', date?.toISOString() || '');
              form.clearFieldError('publishedDate');
            }}
          />
        </div>
      </div>
      {/* Password */}
      <div className={classes['input-group']}>
        <label htmlFor="password" className={classes.label}>
          Mật khẩu <span className={classes.asterisk}>*</span>
        </label>
        <PasswordInputWithStrength
          keyValue={form.key('password')}
          {...form.getInputProps('password')}
          password={form.getValues().password}
        />
      </div>
      {/* Retype password */}
      <div className={classes['input-group']}>
        <label htmlFor="retype_password" className={classes.label}>
          Nhập lại mật khẩu <span className={classes.asterisk}>*</span>
        </label>
        <PasswordInput
          placeholder="Nhập lại mật khẩu mà bạn đã điền ở trên..."
          id="retype_password"
          classNames={{
            wrapper: classes.passwordInputWrapper,
            input: classes.passwordInputInput,
            innerInput: classes.passwordInputInnerInput,
            visibilityToggle: classes['visibility-toggle'],
            error: classes.passwordInputError,
          }}
          visibilityToggleIcon={VisibilityToggleIcon}
          key={form.key('retypePassword')}
          {...form.getInputProps('retypePassword')}
        />
      </div>
      {/* Agreement checkbox */}
      <AgreementCheckbox keyVal={form.key('agreement')} {...form.getInputProps('agreement')} />
      {/* Submit button */}
      <SubmitButton />
    </form>
  );
}
