import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { RegisterUsersService } from '../register-users/register-users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  providers: [ConfirmationService]
})
export class UsersListComponent implements OnInit {

  selectedId: number; // id del registro seleccionado
  selectedUserRow; // fila seleccionada

  usersColumns: any [] = [
    { "header": 'users.primer_nombre', "field": "primerNombre", "width": "20%" , "typeField" :'standard'},
    { "header": 'users.seg_nombre', "field": "segundoNombre", "width": "15%" , "typeField" :'standard'},
    { "header": 'users.primer_apell', "field": "primerApellido", "width": "15%", "typeField" :'standard'},
    { "header": 'users.seg_apellido', "field": "segundoApellido", "width": "15%" , "typeField" :'standard'},
    { "header": 'users.correo', "field": "email", "width": "25%" , "typeField" :'standard'}
  ];
  usersList: any[];
  usersTablePaginator = false;
  usersTableRows = 10 ;
  
  constructor(private router: Router, private toastr: ToastrService, private userService: RegisterUsersService,
              private confirmationService: ConfirmationService, private modalService: NgbModal, private translate: TranslateService,
              private spinner: NgxSpinnerService) { 

              this.spinner.show();
  }

  ngOnInit(): void {
    this.getAllUsers();
  }


  onAddUser() {
    this.router.navigate([`/app/users/register`]);
  }

  onEditUser(id) {
    this.router.navigate([`./app/users/${id}`]);
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((res: any) => {
      this.usersList = res;
      this.usersTablePaginator = (res.length > this.usersTableRows) ? true : false;
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`);
    });
  }

  onDeleteUser(id) {
    this.spinner.show();
    this.userService.deleteUser(id).subscribe((res: any) => {
      this.getAllUsers();
      this.translate.get('success_delete').subscribe((res: string) => {
          this.toastr.success(res);
      });
    },
    err => {
      this.spinner.hide();
      this.toastr.error(`Error, ${err.error.message}`)
    });
  }

  confirmModal(confirmation: string, id) {
    this.modalService.open(confirmation, { centered: true }).result.then((result) => {
			this.onDeleteUser(id);
		}, (reason) => {
			// console.log("pasado");
		});
  }

}
