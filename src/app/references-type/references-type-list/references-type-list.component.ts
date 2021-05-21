import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { ReferencesTypeService } from '../references-type/references-type.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerComponent } from 'src/app/shared/spinner.component';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-references-type-list',
  templateUrl: './references-type-list.component.html',
  styleUrls: ['./references-type-list.component.css'],
  providers: [ConfirmationService]
})
export class ReferencesTypeListComponent implements OnInit {

  referenceType: any[]; /// objecto recuperado del servicio de busqueda
  selectedId: number; // id del registro seleccionado
  selectedReferenceTypeRow; // fila seleccionada

  //tabla de tipos de referencia
  referencesTypeColumns: any[] = [
    { "header": 'main.nombre', "field": "nombre", "width": "15%", "typeField": 'standard' },
    { "header": 'main.descripcion', "field": "descripcion", "width": "75%", "typeField": 'standard' }
  ];
  referencesTypeList: any[];
  referencesTypeTablePaginator = false;
  referencesTypeTableRows = 10;

  constructor(private router: Router, private toastr: ToastrService, private referencesTypeService: ReferencesTypeService,
              private confirmationService: ConfirmationService, private modalService: NgbModal, private translate: TranslateService,
              private spinner: NgxSpinnerService) { 
              
              translate.setDefaultLang('es');
              this.spinner.show();
    }

  ngOnInit(): void {
    this.getAllReferenceType();
  }

  //redirecciona al formulario de registro
  onAddReferenceType() {
    this.router.navigate([`/app/references-type/register`]);
  }

  //redirecciona para editar la informacion del tipo de referencia
  onEditReferenceType(id) {
    this.router.navigate([`./app/references-type/${id}`]);
  }

  //consulta la lista de todos los tipos de referencia
  getAllReferenceType() {
    this.referencesTypeService.getAllReferencesType().subscribe((res: any) => {
      this.referencesTypeList = res;
      this.referencesTypeTablePaginator = (res.length > this.referencesTypeTableRows) ? true : false;
      this.spinner.hide();
    },
      err => {
        this.spinner.hide();
        this.toastr.error(`Error, ${err.error.message}`);
      });
  }

  //eliminar registro
  onDeleteReferenceType(id) {
    this.spinner.show();
    this.referencesTypeService.deleteReferenceType(id).subscribe((res: any) => {
      this.getAllReferenceType();
      this.translate.get('success_delete').subscribe((res: string) => {
        this.toastr.success(res);
      });
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`)
    });
  }

  //modla de confirmacion para eliminar un registro
  confirmModal(confirmation: string, id) {
    this.modalService.open(confirmation, { centered: true }).result.then((result) => {
			this.onDeleteReferenceType(id);
		}, (reason) => {
			// console.log("pasado");
		});
  }

}
