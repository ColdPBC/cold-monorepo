import { Card } from '../card';
import { axiosFetcher } from '@coldpbc/fetchers';
import useSWR from 'swr';
import { NewsItem } from '../newsItem';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application/errors/errorFallback';

const _NewsCard = () => {
  const { data, isLoading } = useSWR<any>(['/news', 'GET'], axiosFetcher);

  const filteredNewsItems = data
    ?.filter(
      (newsItem: any) => newsItem.title && newsItem.image_url && newsItem.url,
    )
    .slice(0, 3);

  const isEmpty = filteredNewsItems?.length === 0;

  if (isEmpty || isLoading) {
    return null;
  }

  return (
    <Card title={'Latest On Climate'} className="flex flex-col gap-4">
      {filteredNewsItems?.map((newsItem: any) => (
        <NewsItem item={newsItem} />
      ))}
    </Card>
  );
};

export const NewsCard = withErrorBoundary(_NewsCard, {
  FallbackComponent: ErrorFallback,
  onError: (error, info) => {
    console.error('Error occurred in NewsCard: ', error);
  },
});
