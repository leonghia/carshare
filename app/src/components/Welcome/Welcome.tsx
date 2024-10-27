import React, { useState } from 'react';
import classes from './Welcome.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import centerIllustrator from '../../assets/images/hello_illustrator.webp';
import logo from '../../assets/images/logo_1.svg';
import leftSideIllustrator from '../../assets/images/side_illustrators_1.webp';
import rightSideIllustrator from '../../assets/images/side_illustrators_2.webp';
import EnterName from './EnterName/EnterName';

type NameSectionProps = { onNext: (value: string) => void };

const NameSection = React.forwardRef<HTMLElement, NameSectionProps>((props, ref) => {
  return (
    <section ref={ref} className={classes.nameSection}>
      {/* Logo */}
      <figure className={classes.logo}>
        <img src={logo} alt="carshare logo" />
      </figure>
      {/* Enter name */}
      <EnterName onNext={props.onNext} />
    </section>
  );
});

const MotionNameSection = motion.create(NameSection);

type WelcomeSectionProps = { name: string; onClick: () => void };

const WelcomeSection = React.forwardRef<HTMLElement, WelcomeSectionProps>((props, ref) => {
  const variants = {
    '0%': {
      opacity: 0,
      y: '-100%',
    },
    '50%': {
      opacity: 1,
      y: '20%',
    },
    '75%': {
      opacity: 1,
      y: '-10%',
    },
    '100%': {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section ref={ref} className={classes.welcomeSection}>
      {/* Logo */}
      <figure className={classes.logo}>
        <img src={logo} alt="carshare logo" />
      </figure>
      {/* Center illustrator */}
      <motion.figure
        animate={{
          opacity: [0, 1, 1, 1],
          y: ['-100%', '20%', '-10%', 0],
        }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
        className={classes.centerIllustrator}
      >
        <img src={centerIllustrator} alt="center illustrator" />
      </motion.figure>
      {/* Hello text & Welcome text */}
      <div className={classes.helloAndWelcomeText}>
        <p className={classes.helloText}>Chào {props.name}!</p>
        <h1 className={classes.welcomeText}>Chào mừng bạn đến với CarShare</h1>
      </div>
      {/* Start button */}
      <Button
        classNames={{ root: classes.startButtonRoot, label: classes.buttonLabel }}
        onClick={props.onClick}
      >
        Bắt đầu
      </Button>
    </section>
  );
});

const MotionWelcomeSection = motion.create(WelcomeSection);

export default function Welcome() {
  const navigate = useNavigate();
  const [isWelcomeVisible, setIsWelcomeVisible] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [userName, setUserName] = useLocalStorage<string>({
    key: 'user_name',
  });

  const handleNext = (value: string) => {
    setName(value);
    // Save name to localStorage
    setUserName(value);
    setIsWelcomeVisible(true);
  };

  const handleStart = () => {
    navigate('/');
  };

  return (
    <div className={classes.container}>
      {/* Left side illustrator */}
      <figure key="left" className={classes.sideIllustrator + ' ' + classes.sideIllustratorLeft}>
        <img src={leftSideIllustrator} alt="left side illustrator" />
      </figure>
      {/* Section */}
      <AnimatePresence mode="wait">
        {isWelcomeVisible && (
          <MotionWelcomeSection
            key="welcome"
            initial={{ opacity: 0, visibility: 'hidden', x: '100%' }}
            animate={{ opacity: 1, visibility: 'visible', x: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={handleStart}
            name={name}
          />
        )}
        {!isWelcomeVisible && (
          <MotionNameSection
            key="name"
            initial={{ opacity: 1, visibility: 'visible', x: 0 }}
            exit={{ opacity: 0, visibility: 'hidden', x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>

      {/* Right side illustrator */}
      <figure key="right" className={classes.sideIllustrator + ' ' + classes.sideIllustratorRight}>
        <img src={rightSideIllustrator} alt="right side illustrator" />
      </figure>
    </div>
  );
}
