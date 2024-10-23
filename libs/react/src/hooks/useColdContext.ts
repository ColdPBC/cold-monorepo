import { useContext } from 'react';
import ColdContext from '../context/coldContext';

export const useColdContext = () => {
	const context = useContext(ColdContext);

	return { ...context };
};
