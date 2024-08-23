import { muiTheme } from '../../../../libs/react/src';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { FC } from 'react';
import { Auth0Decorator } from './auth0Decorator';
import { LaunchdarklyDecorator } from './launchdarklyDecorator';

export const Decorator = (
  Story: FC<unknown>,
  options: {
    parameters: {
      [key: string]: any;
    };
  },
) => {
  return (
    <StyledEngineProvider injectFirst>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={muiTheme}>
          <Auth0Decorator options={options}>
            <LaunchdarklyDecorator options={options}>
              <Story />
            </LaunchdarklyDecorator>
          </Auth0Decorator>
        </ThemeProvider>
      </LocalizationProvider>
    </StyledEngineProvider>
  );
};
