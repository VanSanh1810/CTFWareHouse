export interface ChallData {
    id: string;
    challName: string;
    category: {
        id: string;
        cateName: string;
    };
    tags: [
        {
            id: string;
            tagName: string;
        },
    ];
    description: string;
    source: string;
    sourceUrl: string;
    staticFileName: string;
    staticFileUrl: string;
}
