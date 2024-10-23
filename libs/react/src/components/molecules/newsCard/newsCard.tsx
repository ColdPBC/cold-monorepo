import { Card } from '../card';
import { axiosFetcher } from '@coldpbc/fetchers';
import useSWR from 'swr';
import { NewsItem } from '../newsItem';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application/errors/errorFallback';
import { useColdContext } from '@coldpbc/hooks';
import { ErrorType } from '@coldpbc/enums';

const _NewsCard = () => {
	const { data, isLoading, error } = useSWR<any, any, any>(['/news', 'GET'], axiosFetcher);
	const { logError } = useColdContext();

	if (error) {
		logError(error, ErrorType.SWRError);
		return null;
	}

	const filteredNewsItems = data?.filter((newsItem: any) => newsItem.title && newsItem.image_url && newsItem.url).slice(0, 3);
	const isEmpty = filteredNewsItems?.length === 0;

	if (isEmpty || isLoading) {
		return null;
	}

	return (
		<Card title={'Latest On Climate'} className="flex flex-col gap-4" data-testid={'news-card'}>
			{filteredNewsItems?.map((newsItem: any, index: number) => (
				<div key={'news_item_' + index} className={'w-full'}>
					<NewsItem item={newsItem} />
				</div>
			))}
		</Card>
	);
};

export const NewsCard = withErrorBoundary(_NewsCard, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in NewsCard: ', error);
	},
});
