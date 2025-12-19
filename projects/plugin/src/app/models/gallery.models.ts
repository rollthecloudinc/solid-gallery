export class GalleryItem {
    bindingOption: string;
    query?: string;
    typeMapping?: string;
    imageMapping?: string;
    videoMapping?: string;
    youtubeMapping?: string;
    iframeMapping?: string;
    constructor(data?: GalleryItem) {
        if(data) {
            this.bindingOption = data.bindingOption;
            this.query = data.query;
            this.typeMapping = data.typeMapping;
            this.imageMapping = data.imageMapping;
            this.videoMapping = data.videoMapping;
            this.youtubeMapping = data.youtubeMapping;
            this.iframeMapping = data.iframeMapping;
        }
    }
}