import { Component, OnInit } from '@angular/core';
import { UserService } from '../userService.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../user';


@Component({
    selector: 'app-list-users',
    templateUrl: './list-users.component.html',
    styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {


    constructor(private userService: UserService, private fb: FormBuilder, private modalService: NgbModal, private datePipe: DatePipe) {
        this.filterArray = this.userList;
    }
    get searchTerm(): string {
        return this._searchTerm;
    }
    set searchTerm(val: string) {
        this._searchTerm = val;
        this.filterArray = this.filter(val);
    }
    page = 1;
    pageSize = 7;


    userList: User[] = this.userService.getUser();
    config: any;
    editUser: FormGroup | null = null;
    userDetail: User | null = null;

    filterArray: User[] | null = null;

    joiningDate: string | null = null;


    _searchTerm = '';

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

    filter(v: string) {
        return this.userList.filter(x => x.Name.toLowerCase().
            indexOf(v.toLowerCase()) !== -1 || x.Email.toLowerCase().indexOf(v.toLowerCase()) !== -1);
    }

    deleteUser(id: number): void {
        if (this.filterArray) {
            this.filterArray = this.filterArray.filter(user => user.id !== id);
        }
    }


    logValidationErrors(group: FormGroup) {
        // Object.keys(group.controls).forEach((key: string) => {
        //     const ac = group.get(key);

        //     this.formsErrors[key] = '';
        //     if (ac && !ac.valid && (ac.touched || ac.dirty)) {
        //         const message = this.ValidationMessage[key];
        //         for (const errorKey in ac.errors) {
        //             if (errorKey) {
        //                 this.formsErrors[key] += message[errorKey] + '    ';
        //             }
        //         }
        //     }
        //     if (ac instanceof FormGroup) {
        //         this.logValidationErrors(ac)
        //     }
        // })
    }





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


    onSubmit() {
        if (this.userDetail != null) {
            const index = this.userService.getUser().indexOf(this.userDetail);

            if (this.editUser != null) {
                this.userDetail.Name = this.editUser.get('Name')?.value;
                this.userDetail.Position = this.editUser.get('Position')?.value;
                this.userDetail.Email = this.editUser.get('Email')?.value;
                this.userDetail.Mobile = this.editUser.get('Mobile')?.value;
                this.userDetail.DateOfJoining = this.editUser.get('DateOfJoining')?.value;
                this.userDetail.Salary = this.editUser.get('Salary')?.value;
                this.userDetail.Projects = this.editUser.get('Projects')?.value;
            }

            this.userService.getUser()[index] = this.userDetail;
        } else {
            this.userDetail = new User();

            this.userDetail.id = Math.max.apply(Math, this.userService.getUser().map(function (o) { return o.id; })) + 1;

            this.userDetail.Name = this.editUser?.get('Name')?.value;
            this.userDetail.Position = this.editUser?.get('Position')?.value;
            this.userDetail.Email = this.editUser?.get('Email')?.value;
            this.userDetail.Mobile = this.editUser?.get('Mobile')?.value;
            this.userDetail.DateOfJoining = new Date();
            this.userDetail.Salary = this.editUser?.get('Salary')?.value;
            this.userDetail.Projects = this.editUser?.get('Projects')?.value;
            this.userDetail.imagePath = 'assets/images/users/7.jpg';
            this.filterArray?.push(this.userDetail);

        }
        this.modalService.dismissAll();
        this.userDetail = null;

        this.joiningDate = '';
        this.ngOnInit();

    }


    closeBtnClick() {
        this.modalService.dismissAll();
        this.ngOnInit();
    }


}
