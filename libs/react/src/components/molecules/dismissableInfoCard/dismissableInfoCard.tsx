import { useEffect, useState } from "react";
import { Card } from "../card";
import { motion } from 'framer-motion';

interface Props {
    text: string;
    onDismiss?: () => void;
    dismissKey: string;
}

export const DismissableInfoCard = ({
    text,
    onDismiss,
    dismissKey
}: Props) => {
    const localStorageKey = `dissmissable-info-${dismissKey}`;
    const previouslyDismissed = localStorage.getItem(localStorageKey) === 'true';

    const [dismissed, setDismissed] = useState(previouslyDismissed);
    const [show, setShow] = useState(!previouslyDismissed);

    const handleDismiss = () => {
        localStorage.setItem(localStorageKey, 'true');        
        setDismissed(true);

        if (onDismiss) onDismiss();
    }


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
            animate={{scale: dismissed ? '0' : '1'}}
            transition={{
                duration: 0.4,
                delay: .15,
                ease: [0.42, 0, 0.58, 1]
            }}
        >
            <motion.div
                initial={false}
                animate={{height: dismissed ? '0' : 'auto'}}
                transition={{delay: .5}}
            >
                <Card className='gap-0 text-sm leading-normal flex flex-wrap'>
                    {text}
                    <button className="underline m-0" onClick={handleDismiss}>Don't show again.</button>
                </Card>
            </motion.div>
        </motion.div>
    );
}