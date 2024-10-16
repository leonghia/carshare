import classes from './Welcome.module.scss';
import logo from '../../assets/images/logo.svg';
import leftSideIllustrators from '../../assets/images/side_illustrators_1.webp';
import rightSideIllustrators from '../../assets/images/side_illustrators_2.webp';
import EnterName from './EnterName/EnterName';
import NextButton from './NextButton/NextButton';
import { useField } from '@mantine/form';

export default function Welcome() {
  const field = useField({
    initialValue: '',
    validate: (value) => (value.trim().length == 0 ? 'Tên không được để trống' : null),
  });

  return (
    // Container
    <div className={classes.container}>
      {/* Section */}
      <div className={classes.section}>
        {/* Logo */}
        <figure className={classes.logo}>
          <img className={classes.image} src={logo} alt="CarShare logo" />
        </figure>
        {/* Title & Enter name */}
        <div className={classes['title-and-enter-name']}>
          {/* Title */}
          <h1 className={classes.title}>Chúng mình có thể gọi bạn là?</h1>
          {/* Enter name */}
          <EnterName {...field.getInputProps()} />
        </div>
        {/* Button */}
        <NextButton onClick={field.validate}  />
      </div>
      {/* Left side illustrators */}
      <figure className={classes['figure--left']}>
        <img
          src={leftSideIllustrators}
          alt="left side illustrators"
          className={classes['figure__img']}
        />
      </figure>
      {/* Left side light */}
      <div className={classes['light--left']}></div>
      {/* Right side illustrators */}
      <figure className={classes['figure--right']}>
        <img
          src={rightSideIllustrators}
          alt="left side illustrators"
          className={classes['figure__img']}
        />
      </figure>
      {/* Left side light */}
      <div className={classes['light--right']}></div>
    </div>
  );
}
