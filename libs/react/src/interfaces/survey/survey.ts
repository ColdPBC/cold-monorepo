
export interface SurveySectionType {
    title: string;
    prompt: string;
    component: string | null;
    follow_up: SurveySectionFollowUpType[];
    image_url:  string;
    category_idx: number;
    category_key: string;
    category_description: string;
}


export interface SurveySectionFollowUpType {
    idx: number;
    key: string;
    prompt: string;
    options: string[];
    tooltip: string;
    component: string;
    placeholder: string;
}

export interface SurveySectionsProgressSectionType {
    key: string;
    sectionIndex: number;
    height: number;
}
