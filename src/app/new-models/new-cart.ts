export interface INewCart {
    id: string;
    itemid: string;
    price: number;
    sgprice: number;
    usprice: number;
    type: "card" | "sticker" | "postcard";
    bundle: INewCartBundle | undefined
}

export interface INewCartBundle {
    count: number;
    price: number;
    sgprice: number;
    usprice: number;
}
