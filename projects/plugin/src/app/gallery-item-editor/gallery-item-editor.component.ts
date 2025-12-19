import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContentPluginManager } from '@rollthecloudinc/content';
import { Pane } from '@rollthecloudinc/panels';
import { GalleryItem } from '../models/gallery.models';
import { GalleryItemContentHandler } from '../handlers/gallery-item-content.handler';
import { AttributeSerializerService } from '@rollthecloudinc/attributes';

@Component({
    selector: 'solid-gallery-gallery-item-editor',
    templateUrl: './gallery-item-editor.component.html',
    styleUrls: ['gallery-item-editor.component.scss'],
    standalone: false,
    providers: [
        GalleryItemContentHandler
    ],
})

export class GalleryItemEditorComponent implements OnInit {

    private dialogRef = inject(MatDialogRef<GalleryItemEditorComponent>);
    private dialogData: { panelFormGroup: UntypedFormGroup; paneIndex: number; pane: Pane } = inject(MAT_DIALOG_DATA);
    private handler = inject(GalleryItemContentHandler);
    private attributeSerializer = inject(AttributeSerializerService);    
    
    bindableOptions: Array<string> = [];
    galleryItem: GalleryItem;
    
    readonly contentForm = new FormGroup({
        bindingOption: new FormControl<string>(''),
        query: new FormControl<string>(''),
        typeMapping: new FormControl<string>(''),
        imageMapping: new FormControl<string>(''),
        videoMapping: new FormControl<string>(''),
        youtubeMapping: new FormControl<string>(''),
        iframeMapping: new FormControl<string>('')
    });
    
    constructor(
    ) { 
        console.log('gallery item editor component constructor');
    }

    ngOnInit() { 
        this.bindableOptions = (this.dialogData.panelFormGroup.get('panes') as UntypedFormArray).controls.reduce<Array<string>>((p, c) => (c.get('name').value ? [ ...p, c.get('name').value ] : [ ...p ]), []);
        if(this.dialogData.pane !== undefined) {
            this.handler.toObject(this.dialogData.pane.settings).subscribe((galleryItem: GalleryItem) => {
                this.galleryItem = galleryItem;
                this.contentForm.get('bindingOption').patchValue(this.galleryItem.bindingOption);
                this.contentForm.get('query').patchValue(this.galleryItem.query);
                this.contentForm.get('typeMapping').patchValue(this.galleryItem.typeMapping);
                this.contentForm.get('imageMapping').patchValue(this.galleryItem.imageMapping);
                this.contentForm.get('videoMapping').patchValue(this.galleryItem.videoMapping);
                this.contentForm.get('youtubeMapping').patchValue(this.galleryItem.youtubeMapping);
                this.contentForm.get('iframeMapping').patchValue(this.galleryItem.iframeMapping);
            });
        }
    }

    submit() {
        let paneIndex: number;
        if(this.dialogData.paneIndex === undefined) {
            (this.dialogData.panelFormGroup.get('panes') as UntypedFormArray).push(new FormGroup({
                contentPlugin: new UntypedFormControl('gallery_gallery_item'),
                name: new UntypedFormControl(''),
                label: new UntypedFormControl(''),
                rule: new UntypedFormControl(''),
                settings: new UntypedFormArray([])
            }));
            paneIndex = (this.dialogData.panelFormGroup.get('panes') as UntypedFormArray).length - 1;
        } else {
            paneIndex = this.dialogData.paneIndex;
        }
        const paneForm = (this.dialogData.panelFormGroup.get('panes') as UntypedFormArray).at(paneIndex);
        const bindingOption = this.contentForm.get('bindingOption').value;
        const query = this.contentForm.get('query').value;
        const typeMapping = this.contentForm.get('typeMapping').value;
        const imageMapping = this.contentForm.get('imageMapping').value;
        const videoMapping = this.contentForm.get('videoMapping').value;
        const youtubeMapping = this.contentForm.get('youtubeMapping').value;
        const iframeMapping = this.contentForm.get('iframeMapping').value;

        const galleryItem = new GalleryItem({ query, typeMapping, imageMapping, videoMapping, youtubeMapping, iframeMapping, bindingOption });

        (paneForm.get('settings') as UntypedFormArray).clear();
        const controls = this.handler.buildSettings(galleryItem).map(s => this.attributeSerializer.convertToGroup(s));
        controls.forEach(c => (paneForm.get('settings') as UntypedFormArray).push(c));

        this.dialogRef.close();   
    }
}