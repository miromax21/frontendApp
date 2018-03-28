import { Component, Renderer2, Input, ElementRef, ViewChild, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Utils } from 'app/shared/utils';

export interface IExpandable {
    toggleClass: string;
    popupClickDisabled: Boolean | string;
}

@Component({
    selector: 'expandable',
    templateUrl: './expandable.component.html'
})
export class ExpandableComponent implements IExpandable, OnInit, OnDestroy {

    private _popupClickDisabled: boolean = false;
    private _unregister: Function;

    @ViewChild('popup') popup: ElementRef;
    @Output() onStartToggle = new EventEmitter<() => void>();
    @Input() toggleClass: string;
    @Input() set popupClickDisabled(value: Boolean | string) {
        this._popupClickDisabled = !Utils.IsNullOrUndefined(value) && value !== 'false' && value !== false;
    }

    expand: boolean = false;

    constructor(private _renderer: Renderer2) { }

    ngOnInit() { }

    ngOnDestroy() {
        this._unregister && this._unregister();
    }

    Toggle(e: MouseEvent) {
        if (this.onStartToggle.observers.length != 0) {
            this.onStartToggle.emit(this.$$Toogle.bind(this));
            return;
        }

        this.$$Toogle();
    }

    $$Toogle() {
        if (this.expand) {
            this._unregister && this._unregister();
            this._unregister = undefined;
            this.expand = false;
        }
        else {
            this.expand = true;
            setTimeout(() => {
                this._unregister = this._renderer.listen('window', 'click', (e: any) => {
                    if (this._popupClickDisabled && Utils.Array.Contains<Node | Window>(e.path, this.popup.nativeElement))
                        return;

                    this._unregister();
                    this.expand = false;
                });
            });
        }
    }
}
