import { useState } from 'react';
import classes from './Welcome.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';
import { useLocalStorage, useTimeout } from '@mantine/hooks';
import centerIllustrator from '../../assets/images/hello_illustrator.webp';
import logo from '../../assets/images/logo_1.svg';
import leftSideIllustrator from '../../assets/images/side_illustrators_1.webp';
import rightSideIllustrator from '../../assets/images/side_illustrators_2.webp';
import EnterName from './EnterName/EnterName';

export default function Welcome() {
  const navigate = useNavigate();
  const [isWelcomeVisible, setIsWelcomeVisible] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [userName, setUserName] = useLocalStorage<string>({
    key: 'user_name',
  });
  const { start, clear } = useTimeout(() => setIsWelcomeVisible(true), 350);
  const [isAnimated, setIsAnimated] = useState<boolean>(false);

  const handleNext = (value: string) => {
    setName(value);
    // Save name to localStorage
    setUserName(value);

    setIsAnimated(true);
    start();
  };

  const handleStart = () => {
    navigate('/');
  };

  return (
    <div className={classes.container}>
      {/* Left side illustrator */}
      <figure className={classes.sideIllustrator + ' ' + classes.sideIllustratorLeft}>
        <img src={leftSideIllustrator} alt="left side illustrator" />
      </figure>
      {/* Section */}
      {isWelcomeVisible ? (
        <WelcomeSection onClick={handleStart} name={name} />
      ) : (
        <NameSection isSlideOut={isAnimated} onNext={handleNext} />
      )}
      {/* Right side illustrator */}
      <figure className={classes.sideIllustrator + ' ' + classes.sideIllustratorRight}>
        <img src={rightSideIllustrator} alt="right side illustrator" />
      </figure>
    </div>
  );
}

function NameSection({
  onNext,
  isSlideOut,
}: {
  onNext: (value: string) => void;
  isSlideOut: boolean;
}) {
  return (
    <section
      className={isSlideOut ? classes.nameSection + ' ' + classes.slideOut : classes.nameSection}
    >
      {/* Logo */}
      <figure className={classes.logo}>
        <img src={logo} alt="carshare logo" />
      </figure>
      {/* Enter name */}
      <EnterName onNext={onNext} />
    </section>
  );
}

function WelcomeSection({ name, onClick }: { name: string; onClick: () => void }) {
  return (
    <section className={classes.welcomeSection + ' ' + classes.slideIn}>
      {/* Logo */}
      <figure className={classes.logo}>
        <img src={logo} alt="carshare logo" />
      </figure>
      {/* Center illustrator */}
      <figure className={classes.centerIllustrator + ' ' + classes.falling}>
        <img src={centerIllustrator} alt="center illustrator" />
      </figure>
      {/* Hello text & Welcome text */}
      <div className={classes.helloAndWelcomeText}>
        <p className={classes.helloText}>Chào {name}!</p>
        <h1 className={classes.welcomeText}>Chào mừng bạn đến với CarShare</h1>
      </div>
      {/* Start button */}
      <Button
        classNames={{ root: classes.startButtonRoot, label: classes.buttonLabel }}
        onClick={onClick}
      >
        Bắt đầu
      </Button>
    </section>
  );
}
