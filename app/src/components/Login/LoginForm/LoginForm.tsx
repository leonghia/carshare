import { useState } from 'react';
import classes from './LoginForm.module.scss';
import { Link } from 'react-router-dom';
import { Anchor, Button, PasswordInput, TextInput } from '@mantine/core';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure, useTimeout } from '@mantine/hooks';
import { VisibilityToggleIcon } from '@/components/VisibilityToggleIcon/VisibilityToggleIcon';
import RememberMe from './RememberMe/RememberMe';

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, { open: turnOnLoading, close: turnOffLoading }] = useDisclosure(false);
  const { start: startSubmitting, clear } = useTimeout(() => {
    turnOffLoading();
    setErrorMessage('Email hoặc mật khẩu của bạn không chính xác!');
  }, 3000);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: {
      email: (val) => {
        if (isNotEmpty()(val)) return 'Địa chỉ email không được để trống';
        if (isEmail()(val)) return 'Địa chỉ email không hợp lệ';
        return null;
      },
      password: isNotEmpty('Mật khẩu không được để trống'),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log(values);
    setErrorMessage(null);
    turnOnLoading();
    startSubmitting();
  };

  return (
    <form className={classes.form} onSubmit={form.onSubmit(handleSubmit)}>
      {/* Error */}
      {errorMessage && (
        <div className={classes.error}>
          <p className={classes.errorMessage}>{errorMessage}</p>
        </div>
      )}
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
          {...form.getInputProps('email')}
          key={form.key('email')}
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
            input: classes.passwordInputInput,
            innerInput: classes.passwordInputInnerInput,
            section: classes.passwordInputSection,
            visibilityToggle: classes.passwordInputVisibilityToggle,
            error: classes.passwordInputError,
          }}
          {...form.getInputProps('password')}
          key={form.key('password')}
        />
        {/* Remember me & Forgot password */}
        <div className={classes.rememberMeAndForgotPassword}>
          {/* Remember me */}
          <RememberMe
            keyVal={form.key('rememberMe')}
            {...form.getInputProps('rememberMe')}
            isChecked={form.getValues().rememberMe}
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
          type="submit"
          loading={isLoading}
          // loading={true}
          classNames={{
            root: classes.loginButtonRoot,
            label: classes.buttonLabel,
            loader: classes.buttonLoader,
          }}
          loaderProps={{ classNames: { root: classes.loaderRoot } }}
        >
          Đăng nhập
        </Button>
        {/* Not have an account */}
        <p className={classes.notHaveAccount}>
          Bạn chưa có tài khoản?{' '}
          <Anchor
            component={Link}
            to={'/register'}
            underline="never"
            classNames={{ root: classes.registerAnchorRoot }}
          >
            Đăng ký ngay
          </Anchor>
        </p>
      </div>
    </form>
  );
}
