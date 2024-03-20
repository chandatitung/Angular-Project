import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  users: FormGroup = new FormGroup<any>({});

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.users = this.formBuilder.group({
      id: [''],
      fullname: [''],
      email: [''],
      address: [''],
      gender: [''],
      age: [''],
      familyDetails: this.formBuilder.array([])
    });

    this.activatedRoute.params.subscribe(params => {
      const userId = +params['id'];
      const userData = this.getUserDataFromLocalStorage(userId);
      if (userData) {
        this.insertDataIntoForm(userData);
      }
    });
  }

  getUserDataFromLocalStorage(userId: number): any {
    const userDetails = localStorage.getItem('userDetails');
    if (userDetails) {
      const allUserDetails: any[] = JSON.parse(userDetails);
      return allUserDetails.find(user => user.id === userId);
    }
    return null;
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

  insertDataIntoForm(data: any): void {
    this.users.patchValue({
      id: data.id,
      fullname: data.fullname,
      email: data.email,
      address: data.address,
      gender: data.gender,
      age: data.age
    });

    if (Array.isArray(data.familyDetails)) {
      const familyDetailsArray = this.users.get('familyDetails') as FormArray;
      familyDetailsArray.clear();

      data.familyDetails.forEach((familyDetail: any) => {
        familyDetailsArray.push(
          this.formBuilder.group({
            id: familyDetail.id,
            fullname: familyDetail.fullname,
            email: familyDetail.email,
            address: familyDetail.address,
            gender: familyDetail.gender,
            age: familyDetail.age
          })
        );
      });
    }
  }

  onSubmit(): void {
    if (this.users.valid) {
      const editedUserData = this.users.value;

      const userDetails = localStorage.getItem('userDetails');

      if (userDetails) {
        const allUserDetails: any[] = JSON.parse(userDetails);
        const editedUserIndex = allUserDetails.findIndex(user => user.id === editedUserData.id);

        if (editedUserIndex !== -1) {
          allUserDetails[editedUserIndex] = editedUserData;
          allUserDetails[editedUserIndex]['age'] = `${allUserDetails[editedUserIndex]['age']} years`;

          allUserDetails[editedUserIndex]['familyDetails'] = allUserDetails[editedUserIndex]['familyDetails']?.map((family: any) => {
              return {
                  ...family,
                  age: `${family['age']} years`
              };
          });

          localStorage.setItem('userDetails', JSON.stringify(allUserDetails));

          this.router.navigate(['app/user-list']);
        } else {
          console.log('User with provided ID not found in the array.');
        }
      }
    }
    this.users.reset();
  }
}
