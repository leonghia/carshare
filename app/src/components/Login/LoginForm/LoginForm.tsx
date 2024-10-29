import classes from './LoginForm.module.scss';
import { Anchor, Button, Checkbox, PasswordInput, TextInput } from '@mantine/core';
import { VisibilityToggleIcon } from '@/components/VisibilityToggleIcon/VisibilityToggleIcon';

export default function LoginForm() {
  return (
    <form>
      {/* Fields */}
      <div className={classes.fields}>
        {/* Email */}
        <TextInput
          label="Email"
          placeholder="Nhập địa chỉ email của bạn..."
          classNames={{
            root: classes.emailInputRoot,
            wrapper: classes.textInputWrapper,
            section: classes.textInputSection,
            input: classes.textInputInput,
            label: classes.textInputLabel,
            error: classes.textInputError,
          }}
        />
        {/* Password */}
        <PasswordInput
          label="Mật khẩu"
          placeholder="Nhập mật khẩu của bạn..."
          visibilityToggleIcon={VisibilityToggleIcon}
          classNames={{
            root: classes.passwordInputRoot,
            label: classes.passwordInputLabel,
            wrapper: classes.passwordInputWrapper,
            input: classes.passswordInputInput,
            innerInput: classes.passwordInputInnerInput,
            section: classes.passwordInputSection,
            visibilityToggle: classes.passwordInputVisibilityToggle,
            error: classes.passwordInputError,
          }}
        />
        {/* Remember me & Forgot password */}
        <div className={classes.rememberMeAndForgotPassword}>
          {/* Remember me */}
          <Checkbox
            label="Ghi nhớ tôi"
            classNames={{
              inner: classes.checkboxInner,
              input: classes.checkboxInput,
              label: classes.checkboxLabel,
              icon: classes.checkboxIcon,
            }}
          />
          {/* Forgot password */}
          <Anchor underline="always" className={classes.forgotPasswordAnchorRoot}>
            Quên mật khẩu?
          </Anchor>
        </div>
      </div>
      {/* CTA */}
      <div className={classes.cta}>
        {/* Login button */}
        <Button
          classNames={{
            root: classes.loginButtonRoot,
            label: classes.buttonLabel,
          }}
        >
          Đăng nhập
        </Button>
        {/* Not have an account */}
        <p className={classes.notHaveAccount}>
          Bạn chưa có tài khoản?{' '}
          <Anchor underline="never" classNames={{ root: classes.registerAnchorRoot }}>
            Đăng ký ngay
          </Anchor>
        </p>
      </div>
    </form>
  );
}
