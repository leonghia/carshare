import { createContext } from 'react';

type AssuranceContextProps = {
  isChecked: boolean;
};

export const AssuranceContext = createContext<AssuranceContextProps>({
  isChecked: false,
});
