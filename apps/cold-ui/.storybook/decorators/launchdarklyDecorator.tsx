import { Provider, type ReactSdkContext } from 'launchdarkly-react-client-sdk/lib/context';
import { get } from 'lodash';
import { PropsWithChildren } from 'react';

const emptyState: ReactSdkContext = {
  flags: {},
  flagKeyMap: {},
};

export const LaunchdarklyDecorator = (
  props: PropsWithChildren<{
    options: {
      parameters: {
        [key: string]: any;
      };
    };
  }>,
) => {
  const { options, children } = props;
  const params = get(options, 'parameters.launchdarkly', emptyState);

  return <Provider value={params || emptyState}>{children}</Provider>;
};
