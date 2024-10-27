import { createContext } from 'react';

interface AssuranceContextProps {
  isChecked: boolean;
}

export const AssuranceContext = createContext<AssuranceContextProps>({
  isChecked: false,
});
