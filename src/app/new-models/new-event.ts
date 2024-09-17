export class NewEvent {
    public id: string;
    public name: string;
    public title: string;
    public active: boolean;
    public isCard: boolean;
    public isGift: boolean;
    public isCreations: boolean;
    public isSignAndSend: boolean;
    public isSticker: boolean;
    public isPostcard: boolean;
    public isECard: boolean;
    public isClipart: boolean;
    public image: string;
    public url: string;
    public tag: string;
    public month: '' | 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';
    public week: 0 | 1 | 2 | 3 | 4;
    public day: '' | 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
    public date: number;
    public thumbnail: string;
    public thumbnails: string[];
    public banner: string;
    public banners: string[];
    public icon: string;
    public icons: string[];
}
