import React, { PropsWithChildren, useContext } from 'react';
import ColdContext from '../context/coldContext';
import { LDProvider } from 'launchdarkly-react-client-sdk';

export const ColdLDProvider = ({ children }: PropsWithChildren) => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	// todo: fix this type issue
	const { launchDarklyClientSideId } = useContext(ColdContext);
	return <LDProvider clientSideID={launchDarklyClientSideId}>{children}</LDProvider>;
};
