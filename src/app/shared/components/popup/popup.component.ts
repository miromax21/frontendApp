import { Component, Renderer2, Input, Output, ElementRef, ViewChild, OnInit, OnDestroy, EventEmitter } from '@angular/core';

import { Utils } from 'app/shared/utils';

export interface IPopup {
    toggleClass: string;
    //   popupClickDisabled: Boolean | string;
}

@Component({
    selector: 'popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.less']
})
export class PopupComponent implements IPopup, OnInit, OnDestroy {
    @Input()
    toggleClass: string;
    @Input()
    show: boolean = false;

    @Output() showChange = new EventEmitter<boolean>();

    @ViewChild('popup')
    popup: ElementRef;

    private _popupClickDisabled: boolean = false;
    private _unregister: Function;

    constructor(private _renderer: Renderer2) { }

    ngOnInit() { }

    Close() {
        this.show = false;
        this.showChange.emit(false);
    }

    ngOnDestroy() {
        this._unregister && this._unregister();
    }

}
