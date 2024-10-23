import { useEffect, useState } from 'react';
import { Card } from '../card';
import { motion } from 'framer-motion';
import { getOrgStorage, setOrgStorage } from '@coldpbc/lib';
import { useAuth0Wrapper } from '@coldpbc/hooks';
import { get, set } from 'lodash';

interface Props {
	text: string;
	onDismiss?: () => void;
	dismissKey: string;
}

export const DismissableInfoCard = ({ text, onDismiss, dismissKey }: Props) => {
	const { orgId } = useAuth0Wrapper();
	const localStorageKey = `dissmissable-info-${dismissKey}`;
	const parsedOrgStorage = getOrgStorage(orgId || '');
	const previouslyDismissed = get(parsedOrgStorage, localStorageKey, false) === 'true';

	const [dismissed, setDismissed] = useState(previouslyDismissed);
	const [show, setShow] = useState(!previouslyDismissed);

	const handleDismiss = () => {
		if (orgId) {
			const parsedOrgStorage = getOrgStorage(orgId);
			set(parsedOrgStorage, localStorageKey, 'true');
			setOrgStorage(orgId, parsedOrgStorage);
		}
		setDismissed(true);
		if (onDismiss) onDismiss();
	};

	// After dismissed, wait 500ms for animation to complete,
	// then setShow to false so we return null for the component.
	useEffect(() => {
		if (dismissed) {
			setTimeout(() => {
				setShow(false);
			}, 500);
		}
	}, [dismissed]);

	if (!show) {
		return null;
	}

	return (
		<motion.div
			initial={false}
			animate={{ scale: dismissed ? '0' : '1' }}
			transition={{
				duration: 0.4,
				delay: 0.15,
				ease: [0.42, 0, 0.58, 1],
			}}
			data-testid={'dismissable-info-card'}>
			<motion.div initial={false} animate={{ height: dismissed ? '0' : 'auto' }} transition={{ delay: 0.5 }}>
				<Card className="gap-0 text-sm leading-normal flex flex-wrap">
					{text}
					<button className="underline m-0" onClick={handleDismiss}>
						Don't show again.
					</button>
				</Card>
			</motion.div>
		</motion.div>
	);
};
