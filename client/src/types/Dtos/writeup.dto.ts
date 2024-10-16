export interface WriteupDto {
    id: string;

    title: string;

    content: string;

    createDate: Date;

    updateDate: Date;

    cite: string;

    challenge: string; //Tham chiếu đến challenge
}
