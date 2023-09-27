import { Card } from "../card";
import { TemperatureCheckItem } from "../temperatureCheckItem";
import { axiosFetcher } from "@coldpbc/fetchers";
import useSWR from "swr";
import { forEach, some } from "lodash";
import { GlowPosition } from "../temperatureCheckItem";

// TODO: set default period in constants somewhere and replace all hard-coded values
const PERIOD = 2022;

export type Stat = 'cold_score' | 'footprint' | 'emissions_avoided' | 'actions_completed';

interface Props {
    stats: Stat[];
    cardTitle: string;
}

export const TemperatureCheckCard = ({
    stats,
    cardTitle
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
    const coldScore = data?.definition.cold_score;

    // Footprint value    
    const isEmptyFootprintData = !isFootprintDataLoading && !some(footprintData.subcategories, (
        (subcategory: any) => some(subcategory.activities, (
            (activity: any) => activity.footprint && activity.footprint?.[PERIOD]?.value !== null ))));

    let totalFootprint = 0;
    Object.keys(footprintData?.subcategories ?? {}).forEach((subcategoryKey) => {
      const subcategory = footprintData.subcategories[subcategoryKey];
  
      forEach(subcategory.activities, (activity) => {
        if (activity.footprint && PERIOD in activity.footprint) {
          const footprint = activity.footprint[PERIOD];
          if (footprint && footprint.value !== null) {
            totalFootprint += footprint.value;
          }
        }
      })
    });

    const statComponentMapping: {[key in Stat]: (glowPosition: GlowPosition) => JSX.Element} = {
        cold_score: glowPosition => (
            <TemperatureCheckItem
                title="Climate Journey"
                value={coldScore ?? null}
                icon={(
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.9529 6.1237L20.8138 2H18.1895L16.1642 4.91913C16.1641 4.91904 16.1639 4.91895 16.1637 4.91886L14.8054 6.87674C14.8056 6.87674 14.8058 6.87683 14.806 6.87692L7.92357 16.7971C6.76672 15.6886 6.04633 14.1421 6.04633 12.4324C6.04633 9.06962 8.82975 6.33372 12.2511 6.33372C12.3522 6.33372 12.4527 6.33653 12.5527 6.34123L14.0541 4.17704C13.4724 4.05443 12.8695 3.98847 12.2511 3.98847C7.51408 3.98847 3.66016 7.77637 3.66016 12.4324C3.66016 14.9466 4.78562 17.2063 6.56574 18.7542L3.71475 22.8636H6.33862L13.6647 12.3039H13.6651L16.5941 8.08221C17.742 9.1896 18.4559 10.7303 18.4559 12.4324C18.4559 15.7952 15.6725 18.5311 12.2511 18.5311C12.158 18.5311 12.0657 18.5281 11.9736 18.5241L10.4699 20.6915C11.0449 20.8112 11.6404 20.8752 12.2511 20.8752C16.9881 20.8752 20.842 17.0877 20.842 12.4324C20.842 9.92554 19.7236 7.67158 17.9529 6.1237Z" fill="white"/>
                    </svg>
                )}
                glowPosition={glowPosition}
            />
        ),
        footprint: glowPosition => (
            <TemperatureCheckItem
                title="Footprint"
                value={!isEmptyFootprintData ? Math.round(totalFootprint * 10) / 10 : null}
                unitLabel="tCO2"
                icon={(
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                        <path d="M18.8756 18.5849L18.2532 15.7838C18.1511 15.3265 17.7454 15.0015 17.2769 15.0015H13.5312" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M14.8376 20.7507L13.2539 13.7788C13.1503 13.3236 12.7454 13.0005 12.2785 13.0005H7.89769C7.41932 13.0001 7.00761 13.3385 6.91528 13.8079L6.08594 18.0406" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12.7498 21.0036C17.7225 21.0036 21.7536 16.9725 21.7536 11.9998C21.7536 7.02721 17.7225 2.99609 12.7498 2.99609C7.77721 2.99609 3.74609 7.02721 3.74609 11.9998C3.74609 16.9725 7.77721 21.0036 12.7498 21.0036Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12.7498 21.0036C17.7225 21.0036 21.7536 16.9725 21.7536 11.9998C21.7536 7.02721 17.7225 2.99609 12.7498 2.99609C7.77721 2.99609 3.74609 7.02721 3.74609 11.9998C3.74609 16.9725 7.77721 21.0036 12.7498 21.0036Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M13.7512 6.99805C13.7512 7.82682 13.0794 8.49867 12.2506 8.49867C11.4218 8.49867 10.75 9.17052 10.75 9.9993" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M17.7508 9.99902C17.7508 10.5516 17.3029 10.9995 16.7504 10.9995C16.1979 10.9995 15.75 11.4474 15.75 11.9999" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                )}
                glowPosition={glowPosition}
            />
        ),
        emissions_avoided: glowPosition => (
            <TemperatureCheckItem
                title="Emissions Avoided"
                value={null}
                icon={(
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.028 3H18.472C19.454 3 20.25 3.895 20.25 5V19C20.25 20.105 19.454 21 18.472 21H6.028C5.046 21 4.25 20.105 4.25 19V5C4.25 3.895 5.046 3 6.028 3Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8.25 13.5H16.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8.25 17H12.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16.25 8V10H14.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16.25 10L13.25 7L10.536 9L8.25 7" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                )}
                glowPosition={glowPosition}
            />
        ),
        actions_completed: glowPosition => (
            <TemperatureCheckItem
                title="Actions Completed"
                value={null}
                icon={(
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                        <path d="M12.6797 2.99609C17.6523 2.99609 21.6834 7.02721 21.6834 11.9998C21.6834 16.9724 17.6523 21.0035 12.6797 21.0035" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9.59976 20.4526C8.61283 20.0953 7.69598 19.5681 6.89062 18.895" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6.89062 5.10501C7.69548 4.43115 8.61247 3.90392 9.59976 3.54736" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3.81641 10.4372C3.99718 9.40253 4.3585 8.40764 4.88385 7.49805" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3.81641 13.5615C3.99707 14.5966 4.35839 15.5919 4.88385 16.5018" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M13.0809 15.3312L14.7516 11.9998H10.75L12.4207 8.66846" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M13.0809 15.3312L14.7516 11.9998H10.75L12.4207 8.66846" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12.7498 21.0036C17.7225 21.0036 21.7536 16.9725 21.7536 11.9998C21.7536 7.02721 17.7225 2.99609 12.7498 2.99609C7.77721 2.99609 3.74609 7.02721 3.74609 11.9998C3.74609 16.9725 7.77721 21.0036 12.7498 21.0036Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                )}
                glowPosition={glowPosition}
            />
        )
    }

    const getGlowPositionForIndex = (index: number): GlowPosition => {
        if (index === 0 && stats.length > 2) return 'bottomRight'
        if (index === 0 && stats.length <= 2) return 'centerRight'

        if (index === 1 && stats.length > 2) return 'bottomLeft'
        if (index === 1 && stats.length <= 2) return 'centerLeft'

        if (index === 2 && stats.length > 2) return 'topRight'
        if (index === 3 && stats.length > 2) return 'topLeft'
    }

    return (
        <Card title={cardTitle}>
            <div className="grid gap-2 grid-cols-2 w-full relative">
                {stats.map((stat, index) => statComponentMapping[stat](getGlowPositionForIndex(index)))}
            </div>
        </Card>
    );
}