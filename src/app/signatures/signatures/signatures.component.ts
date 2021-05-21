import { Component, OnInit, EventEmitter, ViewChild, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-signatures',
  templateUrl: './signatures.component.html',
  styleUrls: ['./signatures.component.css']
})
export class SignaturesComponent implements OnInit {

  @ViewChild('mdStickUp', { static: false }) public mdStickUp: ModalDirective;

  @Output() onEventSave = new EventEmitter<any[]>();
  @Output() onEventCancel = new EventEmitter<boolean>();
  
  registerSignature: FormGroup;
  signatures: any = [];
  submitted;
  max: boolean = false;

  get f() {
    return this.registerSignature.controls;
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerSignature = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.maxLength(100)]],
      posicion: ["", [Validators.required, Validators.maxLength(100)]]
    });
  }

  //agregar firma
  addSignature(){
    this.submitted = true;
    if (this.registerSignature.invalid) {
      return;
    }
    this.signatures.push(this.registerSignature.value);
    this.submitted = false;
    this.max = (this.signatures.length === 2)? true:false;
    this.registerSignature.reset();
  }

  //borrar firma
  deleteSignature(idItem){
    this.signatures.splice(this.signatures.indexOf(idItem));
    this.max = (this.signatures.length === 2)? true:false;
  }

  //cancelar la operacion llevada en el formulario.
  onCancel() {
    this.onEventCancel.emit(true);
    this.registerSignature.reset();
  }

  //boton continuar
  onContinue() {
    this.onEventSave.emit(this.signatures);
  }

}
