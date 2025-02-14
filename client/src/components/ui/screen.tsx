import React from "react";
import { useMediaQuery } from "react-responsive";

const checkScreen = (from?: Screen, to?: Screen): void => {
  if (!from && !to) throw new Error("either from or to must be specified");
  if (from && to && Dimensions[from] >= Dimensions[to])
    throw new Error("from must not be greater than to");
  return;
};

type Screen =
  | "8K"
  | "4K"
  | "QHD"
  | "Default"
  | "2XL"
  | "XL"
  | "LG"
  | "MD"
  | "SM"
  | "XS";

const Dimensions: Record<Screen, { min?: number; max?: number }> = {
  "8K": { min: 7680 },
  "4K": { min: 3840, max: 7679 },
  QHD: { min: 2560, max: 3839 },
  Default: { min: 1536, max: 2559 },
  "2XL": { min: 1280, max: 1535 },
  XL: { min: 1024, max: 1279 },
  LG: { min: 768, max: 1023 },
  MD: { min: 640, max: 767 },
  SM: { min: 375, max: 639 },
  XS: { min: 0, max: 374 },
};

interface ScreenProps extends React.PropsWithChildren {
  from?: Screen;
  to?: Screen;
}

const ScreenDefault = ({ children, to }: ScreenProps) => {
  checkScreen("Default", to);
  const isDefault = useMediaQuery(
    to
      ? { minWidth: Dimensions.Default.min, maxWidth: Dimensions[to].max }
      : { minWidth: Dimensions.Default.min }
  );
  return isDefault ? children : null;
};

const Screen2XL = ({ children, from }: ScreenProps) => {
  checkScreen("2XL", from);
  const is2XL = useMediaQuery(
    from
      ? { minWidth: Dimensions[from].min, maxWidth: Dimensions["2XL"].max }
      : { maxWidth: Dimensions["2XL"].max }
  );
  return is2XL ? children : null;
};

const ScreenXL = ({ children, from }: ScreenProps) => {
  checkScreen("XL", from);
  const isXL = useMediaQuery(
    from
      ? { minWidth: Dimensions[from].min, maxWidth: Dimensions.XL.max }
      : { maxWidth: Dimensions.XL.max }
  );
  return isXL ? children : null;
};

const ScreenLG = ({ children, from }: ScreenProps) => {
  checkScreen("LG", from);
  const isLG = useMediaQuery(
    from
      ? { minWidth: Dimensions[from].min, maxWidth: Dimensions.LG.max }
      : { maxWidth: Dimensions.LG.max }
  );
  return isLG ? children : null;
};

const ScreenMD = ({ children, from }: ScreenProps) => {
  checkScreen("MD", from);
  const isMD = useMediaQuery(
    from
      ? { minWidth: Dimensions[from].min, maxWidth: Dimensions.MD.max }
      : { maxWidth: Dimensions.MD.max }
  );
  return isMD ? children : null;
};

const ScreenSM = ({ children, from }: ScreenProps) => {
  checkScreen("SM", from);
  const isSM = useMediaQuery(
    from
      ? { minWidth: Dimensions[from].min, maxWidth: Dimensions.SM.max }
      : { maxWidth: Dimensions.SM.max }
  );
  return isSM ? children : null;
};

const ScreenXS = ({ children }: ScreenProps) => {
  const isXS = useMediaQuery({ maxWidth: Dimensions.XS.max });
  return isXS ? children : null;
};

export {
  ScreenDefault,
  Screen2XL,
  ScreenXL,
  ScreenLG,
  ScreenMD,
  ScreenSM,
  Dimensions,
};
