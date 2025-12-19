import { NgModule } from '@angular/core';
import { PanelsModule, StylePluginManager } from '@rollthecloudinc/panels';
import { GalleryModule as NgxGallleryModule } from 'ng-gallery';
import { pluginGalleryItemContentPluginFactory, pluginGalleryStylePluginFactory } from './app.factories';
import { CommonModule } from '@angular/common';
import { GalleryRenderComponent } from './gallery-render/gallery-render.component';
import { GalleryItemContentHandler } from './handlers/gallery-item-content.handler';
import { ContentPluginManager } from '@rollthecloudinc/content';
import { GalleryItemComponent } from './gallery-item/gallery-item.component';
import { GalleryItemEditorComponent } from './gallery-item-editor/gallery-item-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@rollthecloudinc/material';

@NgModule({
  imports: [
    CommonModule,
    NgxGallleryModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    GalleryRenderComponent,
    GalleryItemComponent,
    GalleryItemEditorComponent
  ],
  exports: [
    GalleryRenderComponent,
    GalleryItemComponent,
    GalleryItemEditorComponent
  ],
  providers: [
    GalleryItemContentHandler
  ]
})
export class GalleryModule { 
  constructor(
    spm: StylePluginManager,
    cpm: ContentPluginManager,
    handler: GalleryItemContentHandler
  ) {
    console.log('register plugin gallery style and item plugin');
    // @todo: lint not picking up register() because in plugin module base class.
    spm.register(pluginGalleryStylePluginFactory());
    cpm.register(pluginGalleryItemContentPluginFactory({ handler }));
  }
}