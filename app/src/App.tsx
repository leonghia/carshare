import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'dayjs/locale/vi';

import { MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { Router } from './Router';
import { theme } from './theme';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <DatesProvider settings={{ locale: 'vi' }}>
        <Router />
      </DatesProvider>
    </MantineProvider>
  );
}
