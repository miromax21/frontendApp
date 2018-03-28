import { Component, Input, OnChanges, TemplateRef, ContentChild, Output, EventEmitter } from '@angular/core';
import { DropdownOption } from './dropdown-option.model';
import { Utils } from 'app/shared/utils';

export interface IDropdown {
    options: DropdownOption[];
    onSelect?: (option: DropdownOption) => void;
}

@Component({
    selector: 'dropdown',
    templateUrl: './dropdown.component.html',
    styles: []
})

export class DropdownComponent implements OnChanges {

    @Input() options: DropdownOption[];
    @Output() onChange = new EventEmitter<DropdownOption>();
    @ContentChild('valueTemplate') valueTemplate: TemplateRef<any>;

    selectedOptionClass: string;
    selectedValue: string;

    constructor() { }

    ngOnChanges() {
        this.SetSelected(Utils.Array.WhereFirst<DropdownOption>(this.options, (el) => el.selected));
    }

    Change(option: DropdownOption): void {
        if (option.value === this.selectedValue)
            return;
        this.SetSelected(option);
        this.onChange.emit(option);
    }

    private SetSelected(option?: DropdownOption): void {
        if (!option) {
            this.selectedValue = '...';
            return;
        }
        this.selectedValue = option.key;
        if (option.className)
            this.selectedOptionClass = option.className;
    }
}