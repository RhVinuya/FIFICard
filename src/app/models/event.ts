export class Event {
    public id?: string;
    public name?: string;
    public active?: boolean;
    public isGift?: boolean;
    public isCreations?: boolean;
    public isSignAndSend?: boolean;
    public isSticker?: boolean;
    public isPostcard?: boolean;
    public image?: string;
    public url?: string;
    public tag: string;
    public month: '' | 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';
    public week: 0 | 1 | 2 | 3 | 4;
    public day: '' | 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
    public date: number;
    public thumbnail: string;
    public thumbnails: string[];
    public banner: string;
    public banners: string[];
}
