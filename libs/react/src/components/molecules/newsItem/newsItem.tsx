import { ArrowUpRightIcon } from '@heroicons/react/20/solid';
import { intlFormatDistance } from 'date-fns';

interface Props {
	item: any;
}

export const NewsItem = ({ item }: Props) => {
	const { title, url, image_url, published_at, source_name } = item;

	const getTimeSincePublished = () => {
		if (!published_at) return null;

		const timeSincePublished = intlFormatDistance(new Date(published_at).valueOf(), new Date());

		return <span className="mr-4">{timeSincePublished.charAt(0).toUpperCase() + timeSincePublished.slice(1)}</span>;
	};

	return (
		<div className="bg-bgc-accent p-4 w-full text-white flex items-center rounded-lg" data-chromatic="ignore">
			<div
				className="w-[80px] h-[80px] bg-cover bg-center bg-no-repeat rounded-lg mr-6"
				style={{
					backgroundImage: `url('${image_url}')`,
				}}
			/>
			<div className="flex-1 flex flex-col">
				<div className="font-bold leading-normal text-md">{title}</div>
				<div className="flex text-xs font-normal mt-2 items-center">
					{getTimeSincePublished()}
					<a className="flex items-center bg-gray-50 py-1 px-2 rounded-full" target="_blank" rel="noreferrer" href={url}>
						{source_name ? `Read More on ${source_name}` : 'Read More'}
						<ArrowUpRightIcon className="h-[14px] ml-2" />
					</a>
				</div>
			</div>
		</div>
	);
};
