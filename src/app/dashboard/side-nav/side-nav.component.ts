import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent implements OnInit {
  menus: Array<any> = [
    {
      title: 'Dashboard',
      url: 'app/dashboard',
      icon: '',
    },
    {
      title: 'Users',
      url: 'app/users',
      icon: '',
    },
    {
      title: 'user-List',
      url: 'app/user-list',
      icon: '',
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onClickMenu(route: string) {
    this.router.navigate([route]);
  }

  logout(){
    localStorage.removeItem('username');
    localStorage.removeItem('password')
    this.router.navigate (['/login']);

  }
  
}