import { useState } from 'react';
import classes from './Register.module.scss';
import logo from '../../assets/images/logo_2.svg';
import ColorSchemeToggle from '../ColorSchemeToggle/ColorSchemeToggle';
import RegisterForm from './RegisterForm/RegisterForm';
import SuccessModal from './SuccessModal/SuccessModal';

export default function Register() {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        {/* Logo */}
        <figure className={classes.logo}>
          <img src={logo} alt="logo" />
        </figure>
        <div className={classes.titleNSubtitle}>
          <h2 className={classes.title}>Bắt đầu hành trình của bạn với chúng mình!</h2>
          <p className={classes.subtitle}>
            CarShare là ứng dụng giúp mọi người chia sẻ cuốc xe chung để tận hưởng những chuyến đi
            vui vẻ và tiết kiệm chi phí
          </p>
        </div>
      </header>
      <main className={classes.main}>
        {/* Left col */}
        <section className={classes['left-col']}>
          {/* Page heading */}
          <div className={classes.headingNToggle}>
            <h1 className={classes.heading}>Đăng ký tài khoản</h1>
            <ColorSchemeToggle />
          </div>
          {/* Form */}
          <RegisterForm
            onSuccessfulSubmit={(email: string) => {
              setIsModalOpened(true);
              setEmail(email);
            }}
          />
        </section>
        {/* Side image */}
        <div className={classes.sideImage}>
          {/* Logo */}
          <figure className={classes.logo}>
            <img src={logo} alt="logo" />
          </figure>
          {/* Title & Subtitle */}
          <div className={classes.titleNSubtitle}>
            <h2 className={classes.title}>Bắt đầu hành trình của bạn với chúng mình!</h2>
            <p className={classes.subtitle}>
              CarShare là ứng dụng giúp mọi người chia sẻ cuốc xe chung để tận hưởng những chuyến đi
              vui vẻ và tiết kiệm chi phí
            </p>
          </div>
        </div>
      </main>
      {isModalOpened && (
        <SuccessModal
          email={email}
          isOpened={isModalOpened}
          onClose={() => setIsModalOpened(false)}
        />
      )}
    </div>
  );
}
