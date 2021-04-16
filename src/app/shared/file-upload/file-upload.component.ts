import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from './file-upload.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  @Input() showNotificacionSuccess = true;
  @Input() accept: string; // determina el patron para los archivos que se recibiran
  @Input() multiple: boolean; // propiedad que determina si es permitida la seleccion multiple o unica
  @Input() urlFileUpload: string;
  @Input() ownerFileId;

  @Input() modeUpload: string;

  @Output() onEventSave = new EventEmitter<any>();
  @Output() onEventCancel = new EventEmitter<boolean>();

  /* Funciona para insertar un solo archivo. La propiedad multiple no esta configurada
  si se extiende la funcionalidad es necesario incluir un parametro por defecto 
  que identifique si el componente se va a comportar multiple o simple
  */
  constructor(public toastr: ToastrService, private fileUploadService: FileUploadService ,
              private formBuilder: FormBuilder, private spinner: NgxSpinnerService) { }

  ngOnInit() { }
  // se dispara luego de la limpia la lista de los archivos
  onCancel() {
    this.onEventCancel.emit(true);
  }

  onSubmit(event, compFileUpload) {
    // console.log(event)
    // console.log(compFileUpload)
    // console.log(this.accept)
    // console.log(this.multiple)
    // console.log(this.urlFileUpload)
    // console.log(this.ownerFileId)
    // console.log(this.modeUpload)
    this.uploadFileToActivity(event,  compFileUpload);

  }

  uploadFileToActivity(event, compFileUpload) {
    this.spinner.show();
    let archivo: File = null;

    if (event.files.length === 0) { return; }
    const fd= new FormData;
    const uploadType = (this.multiple )? 'files' : 'archivo' ;

    if  (!this.multiple) {
      fd.append('curso', this.ownerFileId)
      fd.append('tipo', this.modeUpload)
    }

    for(let file of event.files) {
      console.log(file)
      archivo = <File>file;
      fd.append('file',archivo,archivo.name);
    }

    this.fileUploadService.saveFile(fd, this.urlFileUpload ).subscribe( (res: any) => {
      compFileUpload.clear();
      this.onEventSave.emit( { files: event.files , res});
      console.log({ files: event.files , res});
      if ( this.showNotificacionSuccess ) {
        this.spinner.hide();
        this.toastr.success('Carga exitosa');
      }
      },
      err => {
        this.spinner.hide();
        this.toastr.error(`Error, ${err.error.message}`);
      },
        () => { }
    );
  }

}
