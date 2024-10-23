import { LDContext } from 'launchdarkly-js-sdk-common';
import { get } from 'lodash';
import { LDMultiKindContext, LDSingleKindContext } from '@launchdarkly/node-server-sdk';

export const checkContextValue = (
	context: LDContext,
	searchValue: {
		kind: string;
		key: string;
	},
): boolean => {
	const { kind, key } = searchValue;
	if ('kind' in context) {
		if (get(context, 'kind') === 'multi') {
			const specificContext = get(context, kind);
			return specificContext['kind'] === kind && specificContext['key'] === key;
		} else {
			return get(context, 'kind') === kind && get(context, 'key') === key;
		}
	} else {
		return context.name === kind && context.key === key;
	}
};

export const getUpdatedContext = (
	context: LDContext,
	newContext: {
		kind: string;
		key: string;
	},
	addToExistingContext?: boolean,
	resetContext?: boolean,
): LDContext | LDMultiKindContext | LDSingleKindContext => {
	// this means that the context is not set. return a new context
	if (context.anonymous === true || resetContext === true) {
		return newContext;
	}
	// If the context is a multi context, we need to update the specific context
	// else return the new context
	if (get(context, 'kind') === 'multi') {
		return {
			...context,
			[newContext.kind]: {
				kind: newContext.kind,
				key: newContext.key,
			},
		};
	} else {
		if (addToExistingContext) {
			return {
				kind: 'multi',
				[get(context, 'kind', '') as string]: {
					kind: get(context, 'kind', '') as string,
					key: context.key,
				},
				[newContext.kind]: {
					kind: newContext.kind,
					key: newContext.key,
				},
			};
		} else {
			return {
				kind: newContext.kind,
				key: newContext.key,
			};
		}
	}
};
