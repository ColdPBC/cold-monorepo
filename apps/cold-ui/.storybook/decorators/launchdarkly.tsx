import { Provider, type ReactSdkContext } from 'launchdarkly-react-client-sdk/lib/context';
import { get } from 'lodash';
import { FC } from 'react';

const emptyState: ReactSdkContext = {
  flags: {},
  flagKeyMap: {},
};

export const LaunchDarkly = (props: {
  Story: FC<unknown>;
  options: {
    parameters: {
      [key: string]: any;
    };
  };
}) => {
  const { Story, options } = props;
  const params = get(options, 'parameters.launchdarkly', emptyState);

  return (
    <Provider value={params || emptyState}>
      <Story />
    </Provider>
  );
};
