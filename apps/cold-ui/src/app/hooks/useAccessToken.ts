import axios from 'axios';

export const useAccessToken = () => {
	const setAccessToken = (token: string) => {
		// I don't think this is doing anything...
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		localStorage.setItem('accessToken', token);
	};

	return { setAccessToken };
};
