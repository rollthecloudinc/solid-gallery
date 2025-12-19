import { ContentPlugin } from '@rollthecloudinc/content';
import { DownloadComponent } from './download.component';
import { DownloadContentHandler } from './handlers/download-content.handler';
import { StylePlugin } from '@rollthecloudinc/panels';
import { GalleryItemComponent } from './gallery-item/gallery-item.component';
import { GalleryItemContentHandler } from './handlers/gallery-item-content.handler';
import { GalleryItemEditorComponent } from './gallery-item-editor/gallery-item-editor.component';
import { GalleryRenderComponent } from './gallery-render/gallery-render.component';

export const pluginDownloadContentPluginFactory  = ({ handler }: { handler: DownloadContentHandler }) => {
  return new ContentPlugin<string>({
    id: 'plugin_download',
    title: 'Plugin Download',
    selectionComponent: undefined,
    editorComponent: undefined,
    renderComponent: DownloadComponent,
    handler
  } as any);
};



export const pluginGalleryStylePluginFactory  = () => {
  return new StylePlugin<string>({
    id: 'gallery_gallery',
    title: 'Gallery',
    editorComponent: undefined,
    renderComponent: GalleryRenderComponent,
  } as any);
}

export const pluginGalleryItemContentPluginFactory  = ({ handler }: { handler: GalleryItemContentHandler }) => {
  return new ContentPlugin<string>({
    id: 'gallery_gallery_item',
    title: 'Gallery Item',
    selectionComponent: undefined,
    editorComponent: GalleryItemEditorComponent,
    renderComponent: GalleryItemComponent,
    handler
  } as any);
};