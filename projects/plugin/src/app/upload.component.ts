import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'plugin-upload',
    template: `
        <div class="task">
            <p>Upload</p>
        </div>
    `,
    standalone: false
})

export class UploadComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}