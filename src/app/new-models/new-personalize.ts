import { Allignment } from "./new-enum";

export interface INewPersonalize {
    id: string;
    itemId: string;
    data: INewPersonalizeData[];
}

export interface INewPersonalizeData {
    image: string;
    url: string;
    details: INewPersonalizeDetail[];
}

export interface INewPersonalizeDetail {
    id: string;
    code: number;
    height: number;
    width: number;
    top: number
    left: number;
    text: string;
    font: string;
    color: string;
    size: number;
    alignment: Allignment
}
