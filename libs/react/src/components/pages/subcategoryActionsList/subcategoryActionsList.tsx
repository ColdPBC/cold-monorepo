import { useParams } from "react-router-dom"
import { AppContent, CenterColumnContent, RightColumnContent } from "../../organisms"
import useSWR from 'swr';
import { axiosFetcher } from "@coldpbc/fetchers";
import { Card, SubcategoryJourneyPreview } from "../../molecules";

export const SubcategoryActionsList  = () => {
    const { name } = useParams();
    const { data } = useSWR<any>(['/categories', 'GET'], axiosFetcher);

    if (!name) return null;

    const category = Object.keys(data?.definition?.categories ?? {}).find((category: any) => data?.definition?.categories[category].subcategories[name]);

    if (!category) return null;

    const subcategoryData =
        data?.definition?.categories[category]?.subcategories[name];

    if (!subcategoryData) {
        return null;
    }

    const subcategoryName = subcategoryData.subcategory_name;

    return (
        <AppContent title={subcategoryName}>
            <CenterColumnContent>
                {/* <Card>
                    Your _______ footprint is made up of lorem ipsum dolor sit amet, consec tetur adipiscing elit usmod tempor incididunt ut labore et dol.
                </Card> */}
            </CenterColumnContent>
            <RightColumnContent>
                <SubcategoryJourneyPreview
                    category_key={category}
                    subcategory_key={name}
                    cardTitle={`${subcategoryName} Score`}
                    to='/journey'
                    containerClassName="border-0 w-full rounded-2xl"
                    glow
                />
            </RightColumnContent>
        </AppContent>
    )
}