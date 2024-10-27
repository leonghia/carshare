import classes from './CompleteModal.module.scss';
import { motion } from 'framer-motion';
import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import mailIllustrator from '../../../assets/images/check_email_illustrator.webp';

const MotionModal = motion.create(Modal);

export default function CompleteModal() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <MotionModal
      opened={true}
      onClose={close}
      withCloseButton={false}
      centered
      overlayProps={{
        className: classes.overlayRoot,
      }}
      classNames={{
        root: classes.modalRoot,
        content: classes.modalContent,
        body: classes.modalBody,
      }}
    >
      {/* Illustrator container */}
      <div className={classes.illustratorContainer}>
        {/* Image */}
        <figure className={classes.image}>
          <img src={mailIllustrator} alt="check mail illustrator" />
        </figure>
      </div>
      {/* Lower */}
      <div className={classes.lower}>
        {/* Title & Content */}
        <div className={classes.titleAndContent}>
          <h6 className={classes.title}>Cảm ơn bạn đã đăng ký tài khoản CarShare!</h6>
          <p className={classes.content}>
            Một đường link xác nhận đang được gửi đến địa chỉ email{' '}
            <span className={classes.highlight}>l*******cnn@gmail.com</span> của bạn. Bạn vui lòng
            kiểm tra hòm thư để hoàn tất việc đăng ký nhé.
          </p>
        </div>
        {/* Button */}
        <Button
          classNames={{
            root: classes.buttonRoot,
            label: classes.buttonLabel,
          }}
        >
          OK
        </Button>
      </div>
    </MotionModal>
  );
}
