import { Route } from 'react-router-dom';
import { CreateMaterialPage, MaterialDetail, MaterialsPage } from '@coldpbc/components';
import { useFlags } from 'launchdarkly-react-client-sdk';

export const MaterialRoutes = () => {
	const ldFlags = useFlags();

	return (
		<>
			<Route path={'/materials'} element={<MaterialsPage />} />
			<Route path={'/materials/new'} element={<CreateMaterialPage />} />
			{ldFlags.materialDetailPageCold997 && <Route path={'/materials/:id'} element={<MaterialDetail />} />}
		</>
	);
};
