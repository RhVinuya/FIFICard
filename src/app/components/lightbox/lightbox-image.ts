export class LightboxImage {
    public id: number;
    public image: string;
    public title: string;

    constructor(_id: number, _image: string, _title: string) {
        this.id = _id;
        this.image = _image;
        this.title = _title;
    }
}
