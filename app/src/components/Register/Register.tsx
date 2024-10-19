import classes from './Register.module.scss';
import registerSideImage784w from '../../assets/images/register_side_image_784w.webp';
import RegisterForm from './RegisterForm/RegisterForm';

export default function Register() {
  return (
    <div className={classes.container}>
      <div className={classes.main}>
        {/* Left col */}
        <section className={classes['left-col']}>
          {/* Page heading */}
          <h1 className={classes.heading}>Đăng ký tài khoản</h1>
          {/* Form */}
          <RegisterForm />
        </section>
        {/* Side image */}
        <figure className={classes['side-image']}>
          <img src={registerSideImage784w} alt="side image" />
        </figure>
      </div>
    </div>
  );
}
