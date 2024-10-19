import classes from './Register.module.scss';
import logo from '../../assets/images/logo_2.svg';
import RegisterForm from './RegisterForm/RegisterForm';

export default function Register() {
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
          <h1 className={classes.heading}>Đăng ký tài khoản</h1>
          {/* Form */}
          <RegisterForm />
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
    </div>
  );
}
