import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { /*DatasourceContentHandler,*/ Pane, PanelResolverService } from '@rollthecloudinc/panels';
import { GalleryItem } from "../models/gallery.models";
import { ContentPluginManager } from "@rollthecloudinc/content";

@Injectable({
  providedIn: "root"
})
export class GalleryItemsResolverService {

  constructor(
    // private datasourceContentHandler: DatasourceContentHandler,
    private cpm: ContentPluginManager,
    private panelResolver: PanelResolverService
  ) {}

  resolveItems(instance: GalleryItem, metadata?: Map<string,any>): Observable<Array<{}>> {
    console.log('resolveItems Top 3');
    return of(instance).pipe(
      switchMap(i => {
        console.log('resolveItems Top 2');
        if (i.bindingOption && i.bindingOption !== '' /*&& i.type !== 'autocomplete'*/) {
            const dataPane = metadata.has('panes') ? (metadata.get('panes') as Array<Pane>).find(p => p.name === i.bindingOption) : undefined;
            console.log('resolveItems Top');
            return this.panelResolver.dataPanes(metadata.get('panes') as Array<Pane>).pipe(
              tap(() => console.log('resolveItems Before')),
              switchMap(dataPanes => this.cpm.getPlugin('datasource').pipe(
                map(dsp => ({ dataPanes, dspHandler: dsp.handler }))
              )),
              switchMap(({ dataPanes, dspHandler }) => dataPane ? dspHandler.fetchDynamicData(dataPane.settings, new Map<string, any>([ ...metadata, [ 'dataPanes', dataPanes ] ])) : of([])),
              tap(d => console.log('resolveItems After', d.results)),
              map(d => /*[i, */d.results/*]*/)
            );
        } else {
          return of<Array<{}>>([i, []]);
        }
      })
    );
  }

} 