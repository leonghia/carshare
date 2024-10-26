import { createContext } from 'react';

interface AssuranceContextProps {
  isChecked: boolean;
  setIsChecked: (val: boolean) => void;
}

export const AssuranceContext = createContext<AssuranceContextProps>({
  isChecked: false,
  setIsChecked: () => {},
});
