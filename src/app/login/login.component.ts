import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  loginDetails: FormGroup = new FormGroup({});


  constructor(
    private router : Router,
    private formbuilder: FormBuilder
    ){}

  ngOnInit(){
    this.loginDetails = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

  }
  onClickSubmit(data:any){
    if(this.loginDetails.valid){
      localStorage.setItem('username', data.username);
      localStorage.setItem('password', data.password);
      this.router.navigate(['/app']);
    } else {
      console.log('Invalid username or password');
      this.loginDetails.markAllAsTouched();
    }
    }
  }


