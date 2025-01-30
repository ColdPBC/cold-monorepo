import { Route } from 'react-router-dom';
import { CreateMaterialPage, MaterialDetail, MaterialsPage } from '@coldpbc/components';

export const MaterialRoutes = () => {

	return (
		<>
			<Route path={'/materials'} element={<MaterialsPage />} />
			<Route path={'/materials/new'} element={<CreateMaterialPage />} />
			<Route path={'/materials/:id'} element={<MaterialDetail />} />
		</>
	);
};
