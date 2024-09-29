export interface ChallData {
    challId: string;
    title: string;
    category: string;
    solveStatus: boolean;
    bookmarked: boolean;
    credit: {
        name: string;
        url: string;
    };
}
