import { useState } from 'react';
import classes from './Register.module.scss';
import { Eye, EyeSlash } from 'iconsax-react';
import { PasswordInput, TextInput } from '@mantine/core';
import registerSideImage784w from '../../assets/images/register_side_image_784w.webp';
import PublishedDatePickerInput from './PublishedDatePickerInput/PublishedDatePickerInput';

function VisibilityToggleIcon({ reveal }: { reveal: boolean }) {
  return reveal ? <EyeSlash variant="Bold" /> : <Eye variant="Bold" />;
}

export default function Register() {
  const [nationalIdPublishedDate, setNationalIdPublishedDate] = useState<Date | null>(null);

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        {/* Left col */}
        <section className={classes['left-col']}>
          {/* Page heading */}
          <h1 className={classes.heading}>Đăng ký tài khoản</h1>
          {/* Form */}
          <form className={classes.form}>
            {/* Full name */}
            <div className={classes['input-group']}>
              <label htmlFor="full_name" className={classes.label}>
                Họ tên <span className={classes.asterisk}>*</span>
              </label>
              <TextInput
                placeholder="Nhập họ tên đầy đủ của bạn..."
                id="full_name"
                classNames={{
                  wrapper: classes.wrapper,
                  input: classes.input,
                }}
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
                  wrapper: classes.wrapper,
                  input: classes.input,
                }}
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
                  wrapper: classes.wrapper,
                  input: classes['input--phone-number'],
                  section: classes['section--phone-number'],
                }}
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
                    wrapper: classes.wrapper,
                    input: classes.input,
                  }}
                />
              </div>
              {/* Published date */}
              <div className={classes['input-group']}>
                <label htmlFor="published_date" className={classes.label}>
                  Ngày cấp <span className={classes.asterisk}>*</span>
                </label>
                <PublishedDatePickerInput
                  value={nationalIdPublishedDate}
                  onChange={setNationalIdPublishedDate}
                />
              </div>
            </div>
            {/* Password */}
            <div className={classes['input-group']}>
              <label htmlFor="password" className={classes.label}>
                Mật khẩu <span className={classes.asterisk}>*</span>
              </label>
              <PasswordInput
                placeholder="Nhập mật khẩu bạn muốn đặt..."
                id="password"
                classNames={{
                  wrapper: classes['wrapper--password'],
                  input: classes['input--password'],
                  innerInput: classes['inner-input--password'],
                  visibilityToggle: classes['visibility-toggle'],
                }}
                visibilityToggleIcon={VisibilityToggleIcon}
              />
            </div>
            {/* Retype password */}
            <div className={classes['input-group']}>
              <label htmlFor="password" className={classes.label}>
                Nhập lại mật khẩu <span className={classes.asterisk}>*</span>
              </label>
              <PasswordInput
                placeholder="Nhập lại mật khẩu mà bạn đã điền ở trên..."
                id="password"
                classNames={{
                  wrapper: classes['wrapper--password'],
                  input: classes['input--password'],
                  innerInput: classes['inner-input--password'],
                  visibilityToggle: classes['visibility-toggle'],
                }}
                visibilityToggleIcon={VisibilityToggleIcon}
              />
            </div>
            {/* Submit button */}
          </form>
        </section>
        {/* Side image */}
        <figure className={classes['side-image']}>
          <img src={registerSideImage784w} alt="side image" />
        </figure>
      </div>
    </div>
  );
}
