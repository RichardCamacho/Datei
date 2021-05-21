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

  //metodo para el control de envio del archivo
  onSubmit(event, compFileUpload) {
    this.uploadFileToActivity(event,  compFileUpload);

  }

  //subida del archivo
  uploadFileToActivity(event, compFileUpload) {
    this.spinner.show();
    let archivo: File = null;

    if (event.files.length === 0) { return; }//verificar si la variable contiene o no un archivo
    const fd= new FormData;
    const uploadType = (this.multiple )? 'files' : 'archivo' ;

    if  (!this.multiple) {//formando el paquete del objeto
      fd.append('curso', this.ownerFileId)
      fd.append('tipo', this.modeUpload)
    }

    for(let file of event.files) {
      archivo = <File>file;
      fd.append('file',archivo,archivo.name);
    }

    //envio al servicio de subida
    this.fileUploadService.saveFile(fd, this.urlFileUpload ).subscribe( (res: any) => {
      compFileUpload.clear();
      this.onEventSave.emit( { files: event.files , res});
      if ( this.showNotificacionSuccess ) {
        this.spinner.hide();
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
