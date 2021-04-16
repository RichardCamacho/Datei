import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from './user';
import { UserRxjsServiceService } from './user-rxjs-service.service'

@Component({
    selector: 'app-user-rxjs',
    templateUrl: './user-rxjs.component.html',
    styleUrls: ['./user-rxjs.component.css']
})
export class UserRxjsComponent implements OnInit {

    userList: User[] = [];
    filterArray: User[] = [];
    userDetail: User | null = null;

    config: any;
    editUser: FormGroup | null = null;


    joiningDate: string | null = null;


    page = 1;
    pageSize = 7;

    _searchTerm = '';



    constructor(private userService: UserRxjsServiceService, private fb: FormBuilder, private modalService: NgbModal, private datePipe: DatePipe) {
        this.userService.getUsers().subscribe((data) => {
            this.userList.push(data);
        });
        this.filterArray = this.userList;
    }

    ngOnInit() {
        this.editUser = this.fb.group({
            id: [''],
            Name: ['', Validators.required],
            Position: ['', Validators.required],
            Email: ['', Validators.required],
            Mobile: ['', Validators.required],
            DateOfJoining: ['', Validators.required],
            Salary: ['', Validators.required],
            Projects: ['', Validators.required],
        });
    }

    //search...
    get searchTerm(): string {
        return this._searchTerm;
    }
    set searchTerm(val: string) {
        this._searchTerm = val;
        this.filterArray = this.filter(val);
    }

    filter(v: string) {
        return this.userList.filter(x => x.Name.toLowerCase().
            indexOf(v.toLowerCase()) !== -1 || x.Email.toLowerCase().indexOf(v.toLowerCase()) !== -1);
    }


    // validation...
    ValidationMessage =
        [
            {
                Name: { required: 'Name is required.' }
            }, {
                Position: { required: 'Position is required.' }
            }, {
                Email: { required: 'Email is required.' }
            },
            {
                Mobile: { required: 'Mobile is required.' }
            },

            {
                DateOfJoining: { required: 'DOJ is required.' }
            },
            {
                Salary: { required: 'Salary is required.' }
            },
            {
                Projects: { required: 'Project is required.' }
            },
        ];

    formsErrors = [];


    logValidationErrors(group: FormGroup) {

    }

    // delete user...
    deleteUser(id: number): void {
        if (this.filterArray) {
            this.filterArray = this.filterArray.filter(user => user.id !== id);
            this.userService.deleteUser(id);
        }
    }


    // open model...
    openModal(targetModal: NgbModal, user: User | null) {
        this.modalService.open(targetModal, {
            centered: true,
            backdrop: 'static'
        });


        if (user != null) {

            if (user.DateOfJoining) {
                this.joiningDate = this.datePipe.
                    transform(new Date(user.DateOfJoining), 'yyyy-MM-dd');
            }
            this.userDetail = user;
            this.editUser?.patchValue({
                Name: user.Name,
                Position: user.Position,
                Email: user.Email,
                Mobile: user.Mobile,
                DateOfJoining: user.DateOfJoining,
                Salary: user.Salary,
                Projects: user.Projects,
            });
        }

    }

    // on submit data rom model...
    onSubmit() {
        if (this.filterArray != null && this.userDetail) {
            const index = this.filterArray.indexOf(this.userDetail);

            if (this.editUser != null) {
                this.userDetail.Name = this.editUser.get('Name')?.value;
                this.userDetail.Position = this.editUser.get('Position')?.value;
                this.userDetail.Email = this.editUser.get('Email')?.value;
                this.userDetail.Mobile = this.editUser.get('Mobile')?.value;
                this.userDetail.DateOfJoining = this.editUser.get('DateOfJoining')?.value;
                this.userDetail.Salary = this.editUser.get('Salary')?.value;
                this.userDetail.Projects = this.editUser.get('Projects')?.value;
            }

            this.filterArray[index] = this.userDetail;
            this.userService.updateUser(index, this.userDetail);
        } else {
            debugger;
            this.userDetail = new User();

            if (this.filterArray)
                this.userDetail.id = Math.max.apply(Math, this.filterArray.map(function (o) { return o.id; })) + 1;

            this.userDetail.Name = this.editUser?.get('Name')?.value;
            this.userDetail.Position = this.editUser?.get('Position')?.value;
            this.userDetail.Email = this.editUser?.get('Email')?.value;
            this.userDetail.Mobile = this.editUser?.get('Mobile')?.value;
            this.userDetail.DateOfJoining = new Date();
            this.userDetail.Salary = this.editUser?.get('Salary')?.value;
            this.userDetail.Projects = this.editUser?.get('Projects')?.value;
            this.userDetail.imagePath = 'assets/images/users/7.jpg';

            this.userService.addUser(this.userDetail);
            this.filterArray.splice(0, 0, this.userDetail);

        }
        this.modalService.dismissAll();
        this.userDetail = null;

        this.joiningDate = '';
        this.ngOnInit();

    }

    // close model...
    closeBtnClick() {
        this.modalService.dismissAll();
        this.ngOnInit();
    }

}
