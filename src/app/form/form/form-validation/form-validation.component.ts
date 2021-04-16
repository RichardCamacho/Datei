import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators, NgForm } from '@angular/forms';

@Component({
  templateUrl: './form-validation.component.html'
})
export class FormvalComponent implements OnInit{
    @ViewChild('f', {static:true}) floatingLabelForm: NgForm=Object.create(null);
    @ViewChild('vform', {static:true}) validationForm: FormGroup=Object.create(null);
    regularForm: FormGroup=Object.create(null);
    radioOptions = ['Choose this', 'Choose me'];

    ngOnInit() {
        this.regularForm = new FormGroup({
            'inputEmail': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(24)]),
            'textArea': new FormControl(null, [Validators.required]),
            'radioOption': new FormControl('Option one is this')
        }, {updateOn: 'blur'});
    }

    onReactiveFormSubmit() {
        this.regularForm.reset();
    }
    onTemplateFormSubmit() {
        this.floatingLabelForm.reset();
    }
    onCustomFormSubmit() {
        this.validationForm.reset();
    }

}
