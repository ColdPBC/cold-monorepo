import React from 'react';
import { ErrorType } from '@coldpbc/enums';
import { useAddToastMessage, useColdContext } from '@coldpbc/hooks';
import { FallbackProps } from 'react-error-boundary';
import { ToastMessage } from '@coldpbc/interfaces';

export const ErrorFallback = (props: FallbackProps) => {
	const { logError, logBrowser } = useColdContext();
	const { addToastMessage } = useAddToastMessage();
	logError(props.error, ErrorType.RenderingError);
	logBrowser(
		'Error rendering component',
		'error',
		{
			props,
		},
		props.error,
	);
	addToastMessage({
		// use a user friendly message about the component failing to render
		message: (
			<div className={'flex flex-col gap-[10px]'}>
				<div className={'font-bold'}>Oops! Something went wrong.</div>
				<div className={'test-eyebrow'}>
					Please try refreshing the page. If the issue persists please contact <a href="mailto:support@coldclimate.com">support@coldclimate.com</a>.
				</div>
			</div>
		),
		type: ToastMessage.FAILURE,
		position: 'bottomRight',
	});
	return <div></div>;
};
