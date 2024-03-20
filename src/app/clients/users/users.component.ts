import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: FormGroup = new FormGroup<any>({});
  formDetailList: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router) { }
  ngOnInit(): void {
    this.users = this.formBuilder.group({
      fullname: [''],
      email: [''],
      address: [''],
      gender: [''],
      age: [''],
      familyDetails: this.formBuilder.array([
        this.FamilyDetail()
      ])
    });
  }

  FamilyDetail(): FormGroup {
    return this.formBuilder.group({
      fullname: [''],
      email: [''],
      address: [''],
      gender: [''],
      age: ['']
    });
  }

  get familyDetails(): FormArray {
    return this.users.get('familyDetails') as FormArray;
  }

  addFamilyDetails(): void {
    this.familyDetails.push(this.FamilyDetail());
  }

  onDelete(index: number): void {
    if (this.familyDetails.length > 1) {
      this.familyDetails.removeAt(index);
    }
  }




  onSubmit(): void {
    if (this.familyDetails.valid) {
      let allUserDetails: any = new Array<any>();

      const existingDetails = localStorage.getItem('userDetails');
      if (existingDetails) {
        allUserDetails = JSON.parse(existingDetails);
      }

      let usersDetailLength = Object.keys(allUserDetails).length + 1;

      this.users.value.id = usersDetailLength;
      this.users.value['age'] = `${this.users.value['age']} years`;


      this.users.value?.familyDetails?.map((family: any, familyIndex: number) => {
        family['id'] = familyIndex + 1;
        family['age'] = `${family['age']} years`;

        return family;
      });

      allUserDetails.push(this.users.value);

      localStorage.setItem('userDetails', JSON.stringify(allUserDetails));
      this.router.navigate(['app/user-list']);


      this.users.reset();
    }
  }
}
