import classes from './SubmitButton.module.scss';
import { Anchor, Button } from '@mantine/core';

export default function SubmitButton() {
  return (
    <div className={classes.container}>
      <Button
        classNames={{
          root: classes.root,
          label: classes.label,
        }}
      >
        Đăng ký
      </Button>
      <div className={classes.lower}>
        <span>Bạn đã có tài khoản? </span>
        <Anchor href="/login" underline="never" classNames={{ root: classes.rootAnchor }}>
          Đăng nhập ngay
        </Anchor>
      </div>
    </div>
  );
}
