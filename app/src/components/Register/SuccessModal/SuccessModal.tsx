import { useState } from 'react';
import classes from './SuccessModal.module.scss';
import { Button, Modal } from '@mantine/core';
import checkEmailIllustrator from '../../../assets/images/check_email_illustrator.webp';

const obscureEmail = (email: string) => {
  const [name, domain] = email.split('@');
  return `${name[0]}${new Array(name.length).join('*')}@${domain}`;
};

export default function SuccessModal({
  isOpened,
  onClose,
  email,
}: {
  isOpened: boolean;
  onClose: () => void;
  email: string;
}) {
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const handleClose = () => {
    // Do exit animation
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  return (
    <Modal
      opened={isOpened}
      onClose={handleClose}
      withCloseButton={false}
      overlayProps={{
        className: classes.overlayRoot,
      }}
      classNames={{
        root: classes.modalRoot,
        inner: classes.modalInner,
        content: classes.modalContent + ' ' + isClosing ? classes.closing : classes.opening,
        body: classes.modalBody,
      }}
      transitionProps={{
        transition: {
          in: {},
          out: {},
          common: {},
          transitionProperty: '',
        },
      }}
    >
      {/* Image */}
      <div className={classes.imageContainer}>
        <figure className={classes.imageWrapper}>
          <img
            src={checkEmailIllustrator}
            alt="check email illustrator"
            className={classes.image}
          />
        </figure>
      </div>
      {/* Lower */}
      <div className={classes.lower}>
        {/* Title & Content */}
        <div className={classes.titleNContent}>
          {/* Title */}
          <h6 className={classes.title}>Cảm ơn bạn đã đăng ký tài khoản CarShare!</h6>
          {/* Content */}
          <p className={classes.content}>
            Một đường link xác nhận đang được gửi đến địa chỉ email{' '}
            <span className={classes.highlight}>{obscureEmail(email)}</span> của bạn. Bạn vui lòng
            kiểm tra hòm thư để hoàn tất việc đăng ký nhé.
          </p>
        </div>
        {/* Button */}
        <Button
          onClick={handleClose}
          classNames={{
            root: classes.buttonRoot + ' ' + classes.primaryButtonRoot,
            label: classes.buttonLabel + ' ' + classes.primaryButtonLabel,
          }}
        >
          OK
        </Button>
      </div>
    </Modal>
  );
}
