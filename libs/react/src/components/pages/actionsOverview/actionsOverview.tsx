import { JourneyOverviewCard, TemperatureCheckCard } from "../../molecules";
import { AppContent, CenterColumnContent, RightColumnContent } from "../../organisms";

export const ActionsOverview = () => {
    return (
        <AppContent title='Actions Overview'>
            <CenterColumnContent>

            </CenterColumnContent>
            <RightColumnContent>
                <TemperatureCheckCard
                    cardTitle="Temperature Check"
                    stats={['cold_score', 'actions_completed']}
                    cornerGlow
                />
                <JourneyOverviewCard />
            </RightColumnContent>
        </AppContent>
    );
}