import { Component, Input, OnInit } from '@angular/core';
import { FORM_TYPES, FormConfigTypes } from '../../../constants';

@Component({
    selector: 'app-form-array',
    templateUrl: './form-array.component.html',
    styleUrl: './form-array.component.sass',
})
export class FormArrayComponent implements OnInit {
    @Input() formConfigs?: FormConfigTypes;
    formTypes = FORM_TYPES;

    constructor() {}

    ngOnInit(): void {}
}
