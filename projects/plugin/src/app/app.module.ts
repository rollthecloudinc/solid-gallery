import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DownloadComponent } from './download.component';
import { UploadComponent } from './upload.component';
import { DownloadModule } from './download.module';
import { GalleryModule } from './gallery.module';
@NgModule({
  imports: [
    BrowserModule,
    DownloadModule,
    GalleryModule
  ],
  declarations: [
    AppComponent,
    UploadComponent,
  ],
  bootstrap: [
      AppComponent
  ]
})
export class AppModule { 
  constructor() {
    console.log('plugin app module');
  }
}
