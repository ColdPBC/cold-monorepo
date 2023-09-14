import { PropsWithChildren, useEffect } from 'react';
import { worker } from './browser';
import { DefaultBodyType, MockedRequest, RestHandler } from 'msw';
import { SWRConfig } from 'swr';
import {BrowserRouter} from 'react-router-dom';

export const StoryMockProvider = (
  props: PropsWithChildren<{
    handlers: RestHandler<MockedRequest<DefaultBodyType>>[];
  }>,
) => {
  useEffect(() => {
    worker && worker.use(...props.handlers);
    return () => {
      // clear added handler on dismount, so stories that don't have custom handlers don't get this data
      worker && worker.resetHandlers();
    };
  });

  return (
    // so swr doesn't cache between stories
    <SWRConfig value={{ provider: () => new Map() }}>
      <BrowserRouter>
        {props.children}
      </BrowserRouter>
    </SWRConfig>
  );
};
