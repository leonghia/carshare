import { useState } from 'react';
import classes from './Welcome.module.scss';
import { useField } from '@mantine/form';
import { useLocalStorage } from '@mantine/hooks';
import helloIllustrator from '../../assets/images/hello_illustrator.webp';
import leftSideIllustrators from '../../assets/images/side_illustrators_1.webp';
import rightSideIllustrators from '../../assets/images/side_illustrators_2.webp';
import EnterName from './EnterName/EnterName';
import GetStartedButton from './GetStartedButton/GetStartedButton';
import NextButton from './NextButton/NextButton';

export default function Welcome() {
  const [isNameValid, setIsNameValid] = useState(false);
  const [name, setName] = useLocalStorage({
    key: 'user_name',
    defaultValue: '',
  });

  const field = useField({
    initialValue: '',
    validate: (value) => (value.trim().length == 0 ? 'Tên không được để trống' : null),
  });

  const handleClickNext = async () => {
    const node = await field.validate();
    if (node) return;
    setIsNameValid(true);
    // Save name to localStorage
    setName(field.getValue());
  };

  const logoMarkup = <figure className={classes.logo}></figure>;

  return (
    // Container
    <div className={classes.container}>
      {!isNameValid ? (
        <div className={classes['section--enter-name']}>
          {/* Logo */}
          {logoMarkup}
          {/* Title & Enter name */}
          <div className={classes['title-and-enter-name']}>
            {/* Title */}
            <h1 className={classes.title}>Chúng mình có thể gọi bạn là?</h1>
            {/* Enter name */}
            <EnterName {...field.getInputProps()} />
          </div>
          {/* Next button */}
          <NextButton onClick={handleClickNext} />
        </div>
      ) : (
        <div className={classes['section--hello']}>
          {/* Logo */}
          {logoMarkup}
          {/* Illustrator */}
          <figure className={classes['hello-illustrator']}>
            <img src={helloIllustrator} alt="Hello illustrator" />
          </figure>
          {/* Hello text & Welcome text */}
          <div className={classes['hello-and-welcome-text']}>
            <p className={classes['hello-text']}>Chào {field.getValue()}!</p>
            <h1 className={classes['welcome-text']}>Chào mừng bạn đến với CarShare</h1>
          </div>
          {/* Get started button */}
          <GetStartedButton />
        </div>
      )}
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
