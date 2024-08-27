export interface INewCart {
    id: string;
    itemid: string;
    price: number;
    sgprice: number;
    usprice: number;
    type: "card" | "sticker" | "postcard" | "gift";
    bundle: INewCartBundle | undefined;
    mark: boolean;
}

export interface INewCartBundle {
    count: number;
    price: number;
    sgprice: number;
    usprice: number;
}
