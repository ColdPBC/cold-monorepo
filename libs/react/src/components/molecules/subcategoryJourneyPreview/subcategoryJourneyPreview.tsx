import { axiosFetcher } from '@coldpbc/fetchers';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { twMerge } from 'tailwind-merge';
import { Card } from '../card';
import { motion } from 'framer-motion';

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
  cardTitle?: string;
  to?: string;
  containerClassName?: string;
  glow?: boolean;
}

export const SubcategoryJourneyPreview = ({
  subcategory_key,
  category_key,
  cardTitle,
  to,
  containerClassName,
  glow
}: Props) => {
  const ldFlags = useFlags();
  const { data } = useSWR<any>(['/categories', 'GET'], axiosFetcher);

  const subcategoryData =
    data?.definition?.categories[category_key]?.subcategories[subcategory_key];

  if (!subcategoryData || subcategoryData.journey_score === null) {
    return null;
  }

  const subcategoryName = subcategoryData.subcategory_name;

  const curScoreQuadrantIndex = scoreQuadrants.findIndex(
    (s) =>
      subcategoryData.journey_score >= s.bottom &&
      subcategoryData.journey_score <= s.top,
  );

  const curScoreQuadrant =
    curScoreQuadrantIndex !== -1 ? scoreQuadrants[curScoreQuadrantIndex] : null;

  return (
    <Card
      className={twMerge("gap-0 p-4 border-bgc-accent border rounded-lg w-[310px] text-white bg-bgc-elevated",
        containerClassName
      )}
      glow={!!glow}
    >
      <div
        className={
          'flex h-[24px] w-full' +
          (ldFlags.showActions261 ? ' justify-between' : ' justify-start')
        }
      >
        <h4 className="font-bold text-sm">{cardTitle ?? subcategoryName}</h4>
        {ldFlags.showActions261 && (
          <Link to={to ?? `/actions/${subcategory_key}`} className="w-[24px]">
            <ArrowRightIcon />
          </Link>
        )}
      </div>

      <div className="h-[12px] relative my-2 flex  w-full">
        <motion.div
          className={clsx(
            'h-[8px] absolute rounded-lg top-[2px] left-[2px] right-[2px]',
            {
              'bg-gray-130': curScoreQuadrantIndex === 0,
              'bg-primary-100': curScoreQuadrantIndex === 1,
              'bg-primary-200': curScoreQuadrantIndex === 2,
              'bg-primary-300': curScoreQuadrantIndex === 3,
            },
          )}
          initial={{
            width: 0
          }}
          animate={{
            width: `calc(${subcategoryData.journey_score}% - 4px)`
          }}
          transition={{
            duration: .5
          }}
        />
        <div className="bg-gray-30 flex-1 rounded-l-lg mr-0.5" />
        <div className="bg-gray-30 flex-1 mr-0.5" />
        <div className="bg-gray-30 flex-1 mr-0.5" />
        <div className="bg-gray-30 flex-1 rounded-r-lg" />
      </div>

      <div className="flex text-xs w-full">
        <div className="flex flex-1 rounded-lg flex justify-between py-1.5 px-2 bg-bgc-accent">
          <div>{curScoreQuadrant?.name}</div>
          <div>
            {subcategoryData.journey_score}/
            {scoreQuadrants[curScoreQuadrantIndex + 1]
              ? scoreQuadrants[curScoreQuadrantIndex + 1].bottom
              : 100}
          </div>
        </div>
        {curScoreQuadrantIndex < 3 &&
          <>
            <ArrowRightIcon className="mx-2 w-[24px] text-bgc-accent" />
            <div className="rounded-lg flex py-1.5 px-2 bg-bgc-accent">
              {scoreQuadrants[curScoreQuadrantIndex + 1]
                ? scoreQuadrants[curScoreQuadrantIndex + 1].name
                : 'Trailblazer'}
            </div>
          </>
        }
      </div>
    </Card>
  );
};
