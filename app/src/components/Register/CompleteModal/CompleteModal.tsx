import classes from './CompleteModal.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { Button, Modal } from '@mantine/core';
import mailIllustrator from '../../../assets/images/check_email_illustrator.webp';

const obscureEmail = (email: string) => {
  const [name, domain] = email.split('@');
  return `${name[0]}${new Array(name.length).join('*')}@${domain}`;
};

export default function CompleteModal({
  isOpened,
  close,
  email,
}: {
  isOpened: boolean;
  close: () => void;
  email: string;
}) {
  return (
    <Modal
      opened={isOpened}
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
      <AnimatePresence>
        {isOpened && (
          <motion.div
            key="container"
            initial={{ opacity: 0, visibility: 'hidden', scale: 0.5 }}
            animate={{
              opacity: 1,
              visibility: 'visible',
              scale: 1,
              transition: { duration: 0.5, ease: 'easeOut' },
            }}
            exit={{
              opacity: 0,
              visibility: 'hidden',
              scale: 0.5,
              transition: { duration: 0.5, ease: 'easeOut' },
            }}
            className={classes.modalContainer}
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
                  <span className={classes.highlight}>{obscureEmail(email)}</span> của bạn. Bạn vui
                  lòng kiểm tra hòm thư để hoàn tất việc đăng ký nhé.
                </p>
              </div>
              {/* Button */}
              <Button
                onClick={close}
                classNames={{
                  root: classes.buttonRoot,
                  label: classes.buttonLabel,
                }}
              >
                OK
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
}
