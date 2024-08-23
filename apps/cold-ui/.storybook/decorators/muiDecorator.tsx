// eslint-disable-next-line @nx/enforce-module-boundaries
import { muiTheme } from '../../../../libs/react/src';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { PropsWithChildren } from 'react';

export const MuiDecorator = (props: PropsWithChildren) => {
  const { children } = props;
  return (
    <StyledEngineProvider injectFirst>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
      </LocalizationProvider>
    </StyledEngineProvider>
  );
};
