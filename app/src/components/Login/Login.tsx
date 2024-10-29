import classes from './Login.module.scss';
import logo from '../../assets/images/logo_1.svg';
import ModeToggle from '../ModeToggle/ModeToggle';
import LoginForm from './LoginForm/LoginForm';

export default function Login() {
  return (
    <div className={classes.container}>
      {/* Mode toggle */}
      <ModeToggle className={classes.modeToggle} />
      {/* Login card */}
      <div className={classes.loginCard}>
        {/* Logo & Heading */}
        <div className={classes.logoAndHeading}>
          {/* Logo */}
          <figure className={classes.logo}>
            <img src={logo} alt="carshare logo" />
          </figure>
          {/* Heading */}
          <h1 className={classes.heading}>Đăng nhập</h1>
        </div>
        {/* Form */}
        <LoginForm />
      </div>
    </div>
  );
}
