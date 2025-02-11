import React from "react";
import { useMediaQuery } from "react-responsive";

interface ScreenProps extends React.PropsWithChildren {
  isCapturing?: boolean;
}

const ScreenDefault = ({ children }: ScreenProps) => {
  const isDefault = useMediaQuery({ minWidth: 1536 });
  return isDefault ? children : null;
};

const Screen2XL = ({ children, isCapturing = true }: ScreenProps) => {
  const is2XL = useMediaQuery(
    isCapturing ? { maxWidth: 1535 } : { minWidth: 1280, maxWidth: 1535 }
  );
  return is2XL ? children : null;
};

const ScreenXL = ({ children, isCapturing = true }: ScreenProps) => {
  const isXL = useMediaQuery(
    isCapturing ? { maxWidth: 1279 } : { minWidth: 1024, maxWidth: 1279 }
  );
  return isXL ? children : null;
};

const ScreenLG = ({ children, isCapturing = true }: ScreenProps) => {
  const isLG = useMediaQuery(
    isCapturing ? { maxWidth: 1023 } : { minWidth: 768, maxWidth: 1023 }
  );
  return isLG ? children : null;
};

const ScreenMD = ({ children, isCapturing = true }: ScreenProps) => {
  const isMD = useMediaQuery(
    isCapturing ? { maxWidth: 767 } : { minWidth: 640, maxWidth: 767 }
  );
  return isMD ? children : null;
};

const ScreenSM = ({ children, isCapturing = true }: ScreenProps) => {
  const isSM = useMediaQuery(
    isCapturing ? { maxWidth: 639 } : { minWidth: 375, maxWidth: 639 }
  );
  return isSM ? children : null;
};

export { ScreenDefault, Screen2XL, ScreenXL, ScreenLG, ScreenMD, ScreenSM };
