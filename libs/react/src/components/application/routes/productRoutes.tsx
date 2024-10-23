import { useFlags } from 'launchdarkly-react-client-sdk';
import { Route } from 'react-router-dom';
import { ProductDetail, ProductsPage } from '@coldpbc/components';

export const ProductRoutes = () => {
	const ldFlags = useFlags();
	return (
		<>
			{ldFlags.showProductsPageCold1096 && <Route path={'/products'} element={<ProductsPage />} />}
			{ldFlags.showProductDetailPageCold1140 && <Route path={'/products/:id'} element={<ProductDetail />} />}
		</>
	);
};
