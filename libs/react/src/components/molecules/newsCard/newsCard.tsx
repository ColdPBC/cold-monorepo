import { Card } from "../card";
import { axiosFetcher } from "@coldpbc/fetchers";
import useSWR from "swr";
import { NewsItem } from "../newsItem";

interface Props {

}

export const NewsCard = ({

}: Props) => {
    const { data, isLoading } = useSWR<any>(
        ['/news/', 'GET'],
        axiosFetcher,
    );

    const filteredNewsItems = data?.filter((newsItem: any) => (
        newsItem.title && newsItem.image_url && newsItem.url
    )).slice(0, 3);

    const isEmpty = filteredNewsItems?.length === 0;

    if (isEmpty || isLoading) {
        return null;
    }

    return (
        <Card title={'Latest On Climate'} className='flex flex-col gap-4'>
            {filteredNewsItems?.map((newsItem: any) => <NewsItem item={newsItem} />)}
        </Card>
    );
}
