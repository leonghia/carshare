import classes from './SubmitButton.module.scss';
import { Anchor, Button, Loader } from '@mantine/core';

export default function SubmitButton({ isLoading }: { isLoading: boolean }) {
  return (
    <div className={classes.container}>
      <Button
        disabled={isLoading}
        type="submit"
        classNames={{
          root: classes.buttonRoot + ' ' + classes.primaryButtonRoot,
          label: classes.buttonLabel + ' ' + classes.primaryButtonLabel,
        }}
      >
        {isLoading ? <Loader className={classes.loaderRoot} /> : 'Đăng ký'}
      </Button>
      <div className={classes.lower}>
        <span>Bạn đã có tài khoản? </span>
        <Anchor href="/login" underline="never" classNames={{ root: classes.anchorRoot }}>
          Đăng nhập ngay
        </Anchor>
      </div>
    </div>
  );
}
