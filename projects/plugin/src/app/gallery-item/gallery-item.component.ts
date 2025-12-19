import { AfterViewInit, Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { AttributeValue } from '@rollthecloudinc/attributes';
import { InlineContext } from '@rollthecloudinc/context';
import { Pane } from '@rollthecloudinc/panels';
import { GalleryItem } from '../models/gallery.models';
import { GalleryItem as NgxGalleryItem, GalleryComponent } from 'ng-gallery';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { switchMap, tap, filter, map } from 'rxjs/operators';
import { GalleryItemContentHandler } from '../handlers/gallery-item-content.handler';
import { TokenizerService } from '@rollthecloudinc/token';
import { GalleryItemsResolverService } from '../services/gallery-items-resolver.service';

@Component({
    selector: 'solid-gallery-gallery-item',
    templateUrl: './gallery-item.component.html',
    styleUrls: ['gallery-item.component.scss'],
    standalone: false,
    providers: [
        GalleryItemContentHandler
    ]
})

export class GalleryItemComponent implements OnInit, AfterViewInit {

    rendered = false;

    private handler = inject(GalleryItemContentHandler);
    private tokenizerService = inject(TokenizerService);
    private itemsResolver = inject(GalleryItemsResolverService)

    @Input()
    set settings(settings: Array<AttributeValue>) {
        console.log('Gallery Item settings');
        this.settings$.next(settings);
    }

    @Input()
    set panes(panes: Array<Pane>) {
        console.log('Gallery Item Panes');
        this.panes$.next(panes);
    }

    @Input()
    set originPanes(originPanes: Array<Pane>) {
        console.log('Gallery Item originPanes');
        this.originPanes$.next(originPanes);
    }

    @Input()
    set contexts(contexts: Array<InlineContext>) {
        console.log('Gallery Item contexts');
        this.contexts$.next(contexts);
    }

    @Input()
    tokens: Map<string, any>;

    @Input()
    set resolvedContext(resolvedContext: any) {
        this.resolvedContext$.next(resolvedContext);
    }

    // or using items array
    items: NgxGalleryItem[] = [
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

    private init$ = new Subject<void>();
    private afterContentInit$ = new Subject<void>();
    private afterViewInit$ = new Subject<void>();
    private settings$ = new BehaviorSubject<Array<AttributeValue>>([]);
    private galleryItem$ = new BehaviorSubject<GalleryItem>(undefined);
    private resolvedContext$ = new BehaviorSubject<any>(undefined);
    readonly contexts$ = new BehaviorSubject<Array<InlineContext>>([]);
    readonly panes$ = new BehaviorSubject<Array<Pane>>([]);
    readonly originPanes$ = new BehaviorSubject<Array<Pane>>([]);
    readonly items$ = new BehaviorSubject<NgxGalleryItem[]>(this.items);

    readonly galleryItemSub = this.settings$.pipe(
        switchMap(settings => this.handler.toObject(settings)),
        filter(galleryItem => !!galleryItem),
        tap(() => console.log('Gallery Item galleryItem')),
        tap(galleryItem => this.galleryItem$.next(galleryItem))
    ).subscribe();

    protected readonly itemsSub = combineLatest([
        this.galleryItem$,
        this.panes$,
        this.originPanes$,
        this.contexts$,
        this.init$
    ]).pipe(
        tap(() => console.log('Start pipeline')),
        map(([galleryItem, panes, originPanes, contexts]) => ({ galleryItem, metadata: new Map<string, any>([ [ 'panes', [ ...(panes && Array.isArray(panes) ? panes : []), ...(originPanes && Array.isArray(originPanes) ? originPanes : []) ] ], [ 'contexts', contexts ] ]) })),        
        switchMap(({ galleryItem, metadata }) => {
            console.log('resolveItems Parent');
            return this.itemsResolver.resolveItems(galleryItem, metadata).pipe(
                map(results => ({ galleryItem, results }))
            );
        }),
        tap(({ results }) => console.log('Gallery Item Data Panes', results)),
        tap(({ results, galleryItem }) => {
            const items: NgxGalleryItem[] = [];
            results.forEach(item => {
                const tokens = this.tokenizerService.generateGenericTokens(item,'');
                let type = galleryItem.typeMapping && galleryItem.typeMapping !== '' ? this.replaceTokens(galleryItem.typeMapping.trim(), tokens) : undefined;
                const image = galleryItem.imageMapping && galleryItem.imageMapping !== '' ? this.replaceTokens(galleryItem.imageMapping.trim(), tokens) : undefined;
                const video = galleryItem.videoMapping && galleryItem.videoMapping !== '' ? this.replaceTokens(galleryItem.videoMapping.trim(), tokens) : undefined;
                const youtube = galleryItem.youtubeMapping && galleryItem.youtubeMapping !== '' ? this.replaceTokens(galleryItem.youtubeMapping.trim(), tokens) : undefined;
                const iframe = galleryItem.iframeMapping && galleryItem.iframeMapping !== '' ? this.replaceTokens(galleryItem.iframeMapping.trim(), tokens) : undefined;
                if (type === undefined) {
                    if (image !== undefined) {
                        type = 'image';
                    } else if (video !== undefined) {
                        type = 'video';
                    } else if (youtube !== undefined) {
                        type = 'youtube';
                    } else if (iframe !== undefined) {
                        type = 'iframe';
                    }
                }
                switch(type) {

                    case 'iframe':
                        items.push({ type: 'iframe', data: { src: iframe /*, thumb: image'IMAGE_THUMBNAIL_URL'*/ }});
                        break;

                    case 'youtube':
                        items.push({ type: 'youtube', data: { src: youtube /*, thumb: image'IMAGE_THUMBNAIL_URL'*/ }});
                        break;

                    case 'video':
                        items.push({ type: 'video', data: { src: video /*, thumb: image'IMAGE_THUMBNAIL_URL' poster*/ }});
                        break;

                    case 'image':
                    default:
                        items.push({ type: 'image', data: { src: image, thumb: image/*'IMAGE_THUMBNAIL_URL'*/ }});
                }
            })
            this.items$.next(items);
        })
        // tap(refs => console.log('my refs are', refs)),
        // tap(refs => this.refs$.next(refs))
    ).subscribe();

    constructor(
    ) { 
        console.log('gallery item component constructor');
    }

    ngOnInit() {
        this.init$.next(undefined);
        this.init$.complete();
    }

    ngAfterViewInit() {
        this.rendered = true;
        this.afterViewInit$.next(undefined);
        this.afterViewInit$.complete();
    }

    private replaceTokens(v: string, tokens: Map<string, any>): string {
        tokens.forEach((value, key) => {
            v = v.split(`[${key}]`).join(`${value}`)
        });
        return v;
    }

}