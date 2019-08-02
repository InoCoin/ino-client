export class NewModel {

    _id: string;
    description: string;
    shortTitle: string;
    thumbnail: string;
    url: string;
    originalImageUrl: string;
    title: string;
    publishedAt: Date;

    constructor({ _id, description, thumbnail, url, originalImageUrl, title, publishedAt }) {
        this._id = _id;
        this.description = description;
        this.shortTitle = title.length > 67 ? `${title.slice(0, 65)}...` : title;
        this.thumbnail = thumbnail;
        this.url = url;
        this.originalImageUrl = originalImageUrl;
        this.title = title;
        this.publishedAt = new Date(publishedAt);
    }

}
