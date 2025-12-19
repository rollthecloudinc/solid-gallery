import { Component, OnInit } from "@angular/core";
import { GalleryItem, ImageItem } from "ng-gallery";

@Component({
  selector: 'solid-gallery-gallery-render',
  templateUrl: './gallery-render.component.html',
  styleUrls: ['./gallery-render.component.scss'],
  standalone: false
})        
export class GalleryRenderComponent implements OnInit {

  // or using items array
  items: GalleryItem[] = [
    {
      type: 'image',
      data: {
        src: 'https://cdn.pixabay.com/photo/2012/02/16/12/08/test-13394_1280.jpg',
        thumb: 'IMAGE_THUMBNAIL_URL'
      }
    },
    {
      type: 'image',
      data: {
        src: 'https://cdn.pixabay.com/photo/2012/02/16/12/08/test-13394_1280.jpg',
        thumb: 'IMAGE_THUMBNAIL_URL'
      }
    },
    {
      type: 'image',
      data: {
        src: 'https://cdn.pixabay.com/photo/2012/02/16/12/08/test-13394_1280.jpg',
        thumb: 'IMAGE_THUMBNAIL_URL'
      }
    }
    // more items
  ];

  ngOnInit() {
    // Set items array
    /*this.images = [
      new ImageItem({ src: 'https://cdn.pixabay.com/photo/2012/02/16/12/08/test-13394_1280.jpg', thumb: 'https://cdn.pixabay.com/photo/2012/02/16/12/08/test-13394_1280.jpg' }),
      new ImageItem({ src: 'IMAGE_SRC_URL', thumb: 'IMAGE_THUMBNAIL_URL' }),
      new ImageItem({ src: 'IMAGE_SRC_URL', thumb: 'IMAGE_THUMBNAIL_URL' }),
      // ... more items
    ];*/
  }

 }