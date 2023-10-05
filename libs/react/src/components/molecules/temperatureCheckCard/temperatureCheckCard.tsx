import { Card } from "../card";
import { TemperatureCheckItem } from "../temperatureCheckItem";
import { axiosFetcher } from "@coldpbc/fetchers";
import useSWR from "swr";
import { forEach, some } from "lodash";
import { GlowPosition } from "../temperatureCheckItem";
import { ColdFootprintIcon } from "../../atoms";
import { ColdScoreIcon } from "../../atoms/icons/coldScoreIcon";
import { ColdFootprintIconTwo } from "../../atoms/icons/coldFootprintIconTwo";
import { ColdActionsCompletedIcon } from "../../atoms/icons/coldActionsCompletedIcon";

// TODO: set default period in constants somewhere and replace all hard-coded values
const PERIOD = 2022;

export type Stat = 'cold_score' | 'footprint' | 'emissions_avoided' | 'actions_completed';

interface Props {
    stats: Stat[];
    cardTitle: string;
    cornerGlow?: boolean;
}

export const TemperatureCheckCard = ({
    stats,
    cardTitle,
    cornerGlow
}: Props) => {
    const { data, isLoading: isCategoryDataLoading } = useSWR<any>(
        ['/categories', 'GET'],
        axiosFetcher,
    );

    const { data: footprintData, isLoading: isFootprintDataLoading } = useSWR<any>(
        ['/categories/company_decarbonization', 'GET'],
        axiosFetcher,
    );

    if (isCategoryDataLoading || isFootprintDataLoading) {
        return null;
    }

    // Climate Journey value
    const coldScore = data?.definition?.cold_score;

    // Footprint value
    const isEmptyFootprintData = !isFootprintDataLoading && !some(footprintData.subcategories, (
        (subcategory: any) => some(subcategory.activities, (
            (activity: any) => activity.footprint && activity.footprint?.[PERIOD]?.value !== null ))));

    let totalFootprint = 0;
    Object.keys(footprintData?.subcategories ?? {}).forEach((subcategoryKey) => {
      const subcategory = footprintData.subcategories[subcategoryKey];

      if (subcategory?.activities) {
        forEach(subcategory.activities, (activity) => {
          if (activity.footprint && PERIOD in activity.footprint) {
            const footprint = activity.footprint[PERIOD];
            if (footprint && footprint.value !== null) {
              totalFootprint += footprint.value;
            }
          }
        })
      }
    });

    const statComponentMapping: {[key in Stat]: (glowPosition: GlowPosition) => JSX.Element} = {
        cold_score: glowPosition => (
            <TemperatureCheckItem
                title="Cold Score"
                value={coldScore ?? null}
                icon={<ColdScoreIcon className="fill-white stroke-white" />}
                glowPosition={glowPosition}
            />
        ),
        footprint: glowPosition => (
            <TemperatureCheckItem
                title="Footprint"
                value={!isEmptyFootprintData ? Math.round(totalFootprint * 10) / 10 : null}
                unitLabel="tCO2"
                icon={<ColdFootprintIconTwo className="." />}
                glowPosition={glowPosition}
            />
        ),
        emissions_avoided: glowPosition => (
            <TemperatureCheckItem
                title="Emissions Avoided"
                value={null}
                icon={<ColdFootprintIcon className="stroke-white" />}
                unitLabel="tCO2"
                glowPosition={glowPosition}
            />
        ),
        actions_completed: glowPosition => (
            <TemperatureCheckItem
                title="Actions Completed"
                value={null}
                icon={<ColdActionsCompletedIcon className="." />}
                glowPosition={glowPosition}
            />
        )
    }

    const getGlowPositionForIndex = (index: number): GlowPosition => {
        if (index === 0 && (stats.length > 2 || cornerGlow)) return 'bottomRight'
        if (index === 0 && stats.length <= 2) return 'centerRight'

        if (index === 1 && (stats.length > 2 || cornerGlow)) return 'bottomLeft'
        if (index === 1 && stats.length <= 2) return 'centerLeft'

        if (index === 2 && stats.length > 2) return 'topRight'
        if (index === 3 && stats.length > 2) return 'topLeft'

        return 'centerRight'
    }

    return (
        <Card title={cardTitle}>
            <div className="grid gap-2 grid-cols-2 w-full relative">
                {stats.map((stat, index) => statComponentMapping[stat](getGlowPositionForIndex(index)))}
            </div>
        </Card>
    );
}
