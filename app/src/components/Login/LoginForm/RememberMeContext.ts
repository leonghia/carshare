import { createContext } from 'react';

type RememberMeContextProps = {
  isChecked: boolean;
};

export const RememberMeContext = createContext<RememberMeContextProps>({
  isChecked: false,
});
