import { axiosFetcher } from '@coldpbc/fetchers';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import useSWR from 'swr';

const scoreQuadrants = [
    {
        name: 'Seeker',
        bottom: 0,
        top: 24,
    },
    {
        name: 'Explorer',
        bottom: 25,
        top: 49,
    },
    {
        name: 'Adventurer',
        bottom: 50,
        top: 74,
    },
    {
        name: 'Trailblazer',
        bottom: 75,
        top: 100,
    },
];

interface Props {
    subcategory_key: string;
    category_key: string;
}

export const SubcategoryJourneyPreview = ({
    subcategory_key,
    category_key
}: Props) => {
    const { data } = useSWR<any>(
        ['/categories', 'GET'],
        axiosFetcher,
    );

    const subcategoryData = data?.categories[category_key]?.subcategories[subcategory_key];

    console.log({subcategory_key, subcategoryData})

    if (!subcategoryData) {
        return null;
    }

    const subcategoryName = subcategoryData.subcategory_name;

    const curScoreQuadrantIndex = scoreQuadrants.findIndex(s => 
        subcategoryData.journey_score >= s.bottom && 
            subcategoryData.journey_score <= s.top);

    const curScoreQuadrant = curScoreQuadrantIndex !== -1 ? 
        scoreQuadrants[curScoreQuadrantIndex] : null;

    return (
        <div className="p-4 border-bgc-accent border rounded-lg w-[310px] text-white">
            <div className="flex justify-between">
                <h4 className='font-bold text-sm'>{subcategoryName}</h4>

                <Link to={`/actions/${subcategory_key}`} className='w-[24px]'>
                    <ArrowRightIcon />
                </Link>
            </div>

            <div className='h-[12px] relative my-2 flex'>
                <div
                    className={clsx(
                        'h-[8px] absolute rounded-lg top-[2px] left-[2px] right-[2px]',
                        {
                            'bg-gray-130': curScoreQuadrantIndex === 0,
                            'bg-primary-100': curScoreQuadrantIndex === 1,
                            'bg-primary-200': curScoreQuadrantIndex === 2,
                            'bg-primary-300': curScoreQuadrantIndex === 3,
                        }
                    )}
                    style={{ width: `calc(${subcategoryData.journey_score}% - 4px)` }}
                />
                <div
                    className='bg-gray-30 flex-1 rounded-l-lg mr-0.5'
                />
                <div
                    className='bg-gray-30 flex-1 mr-0.5'
                />
                <div
                    className='bg-gray-30 flex-1 mr-0.5'
                />
                <div
                    className='bg-gray-30 flex-1 rounded-r-lg'
                />
            </div>

            <div className='flex text-xs'>
                <div className='flex flex-1 rounded-lg flex justify-between py-1.5 px-2 bg-bgc-accent'>
                    <div>{curScoreQuadrant?.name}</div>
                    <div>
                        {subcategoryData.journey_score}
                        /
                        {scoreQuadrants[curScoreQuadrantIndex + 1] ? scoreQuadrants[curScoreQuadrantIndex + 1].bottom : 100}
                    </div>
                </div>
                <ArrowRightIcon className='mx-2 w-[24px] text-bgc-accent' />
                <div className='rounded-lg flex py-1.5 px-2 bg-bgc-accent'>
                    {scoreQuadrants[curScoreQuadrantIndex + 1] ? scoreQuadrants[curScoreQuadrantIndex + 1].name : 'Trailblazer'}
                </div>
            </div>
        </div>
    );
}