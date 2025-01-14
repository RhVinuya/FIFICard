export interface INewDiscount {
    code: string,
    value: number,
    disctype: 'percent' | 'amount',
    active: boolean,
    event: string,
    type: "card" | "sticker" | "postcard" | "gift"
}


export class NewDiscount {
}
