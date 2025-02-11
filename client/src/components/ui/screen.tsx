import React from "react";
import { useMediaQuery } from "react-responsive";

const ScreenDefault = ({
  children,
  minWidth = 1536,
}: {
  children: React.ReactNode;
  minWidth?: number;
}) => {
  const isDefault = useMediaQuery({ minWidth });
  return isDefault ? children : null;
};

const Screen2XL = ({ children }: { children: React.ReactNode }) => {
  const is2XL = useMediaQuery({ minWidth: 1280, maxWidth: 1535 });
  return is2XL ? children : null;
};

const ScreenXL = ({ children }: { children: React.ReactNode }) => {
  const isXL = useMediaQuery({ minWidth: 1024, maxWidth: 1279 });
  return isXL ? children : null;
};

const ScreenLG = ({ children }: { children: React.ReactNode }) => {
  const isLG = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  return isLG ? children : null;
};

const ScreenMD = ({ children }: { children: React.ReactNode }) => {
  const isMD = useMediaQuery({ minWidth: 640, maxWidth: 767 });
  return isMD ? children : null;
};

const ScreenSM = ({ children }: { children: React.ReactNode }) => {
  const isSM = useMediaQuery({ maxWidth: 639 });
  return isSM ? children : null;
};

export { ScreenDefault, Screen2XL, ScreenXL, ScreenLG, ScreenMD, ScreenSM };
