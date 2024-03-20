import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit{
responsedata: any;
goToForm() {
}
  formDetailList: any;

  constructor(
    private router: Router
  ){}

  ngOnInit(): void {

    const existingDetails = localStorage.getItem('userDetails');
    if (existingDetails) {
      this. responsedata = JSON.parse(existingDetails);
    }

  } 
  onEdit(id:number)
  {
    console.log('user ID:', id);
    this.router.navigate(['/app/edit-user/', id])
    
  }

  onDelete(index: number): void {
    this.responsedata.splice(index, 1);
      localStorage.setItem('userDetails', JSON.stringify(this.responsedata));
  }
  

}
