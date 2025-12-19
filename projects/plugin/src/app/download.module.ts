import { NgModule } from '@angular/core';
import { DownloadComponent } from './download.component';
import { DownloadContentHandler } from './handlers/download-content.handler';
import { ContentPluginManager } from '@rollthecloudinc/content';
import { pluginDownloadContentPluginFactory, pluginGalleryStylePluginFactory } from './app.factories';
import { CommonModule } from '@angular/common';
// import { StylePluginManager } from '@rollthecloudinc/panels';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    DownloadComponent
  ],
  providers: [
    DownloadContentHandler
  ],
  exports: [
    DownloadComponent
  ]
})
export class DownloadModule { 
  constructor(
    cpm: ContentPluginManager,
    // spm: StylePluginManager,
    downloadHandler: DownloadContentHandler
  ) {
    console.log('register plugin download content plugin');
    // @todo: lint not picking up register() because in plugin module base class.
    cpm.register(pluginDownloadContentPluginFactory({ handler: downloadHandler }));
    //spm.register(pluginGalleryStylePluginFactory());
  }
}
