import { useState } from 'react';
import classes from './Register.module.scss';
import { useDisclosure } from '@mantine/hooks';
import logo from '../../assets/images/logo.svg';
import ModeToggle from '../ModeToggle/ModeToggle';
import CompleteModal from './CompleteModal/CompleteModal';
import RegisterForm from './RegisterForm/RegisterForm';

export default function Register() {
  const [isCompleteModalOpened, { open: openCompleteModal, close: closeCompleteModal }] =
    useDisclosure(false);

  const [userEmail, setUserEmail] = useState<string>('');

  const handleFormSubmitted = (email: string) => {
    setUserEmail(email);
    openCompleteModal();
  };

  return (
    // Container
    <div className={classes.container}>
      {/* Hero (tablet & mobile) */}
      <div className={classes.hero}>
        {/* Logo */}
        <figure className={classes.logo}>
          <img src={logo} alt="logo" />
        </figure>
        {/* Title & Subtitle */}
        <div className={classes.titleAndSubtitle}>
          {/* Title */}
          <h6 className={classes.title}>Bắt đầu hành trình của bạn với chúng mình!</h6>
          {/* Subtitle */}
          <p className={classes.subtitle}>
            CarShare là ứng dụng giúp mọi người chia sẻ cuốc xe chung để tận hưởng những chuyến đi
            vui vẻ và tiết kiệm chi phí
          </p>
        </div>
      </div>
      {/* Main */}
      <main className={classes.main}>
        {/* Left col */}
        <div className={classes.leftCol}>
          {/* Heading & Toggle */}
          <div className={classes.headingAndToggle}>
            {/* Heading */}
            <h1 className={classes.heading}>Đăng ký tài khoản</h1>
            {/* Mode toggle */}
            <ModeToggle />
          </div>
          {/* Form */}
          <RegisterForm onSubmitted={handleFormSubmitted} />
        </div>
        {/* Right col */}
        <div className={classes.rightCol}>
          {/* Logo */}
          <figure className={classes.logo}>
            <img src={logo} alt="carshare logo" />
          </figure>
          {/* Title & Subtitle */}
          <div className={classes.titleAndSubtitle}>
            {/* Title */}
            <h6 className={classes.title}>Bắt đầu hành trình của bạn với chúng mình!</h6>
            {/* Subtitle */}
            <p className={classes.subtitle}>
              CarShare là ứng dụng giúp mọi người chia sẻ cuốc xe chung để tận hưởng những chuyến đi
              vui vẻ và tiết kiệm chi phí
            </p>
          </div>
          {/* Overlay */}
          <div className={classes.overlaySideImg}></div>
        </div>
      </main>
      {/* Complete modal */}
      <CompleteModal
        email={userEmail}
        isOpened={isCompleteModalOpened}
        close={closeCompleteModal}
      />
    </div>
  );
}
