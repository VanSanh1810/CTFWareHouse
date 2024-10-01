export interface ChallData {
    challId: string;
    title: string;
    category: string;
    bookmarked: boolean;
    credit: {
        name: string;
        url: string;
    };
}
