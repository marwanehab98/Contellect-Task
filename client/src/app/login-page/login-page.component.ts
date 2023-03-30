import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{
  username!: String;
  password!: String;
  user$: Observable<object> | undefined;
  

  constructor(private loginService: LoginService, private router: Router) {
    this.username = '';
    this.password = '';
  }
  ngOnInit(): void {
    let user = localStorage.getItem('user');
    if(user) this.router.navigateByUrl('/main');
  }


  login() {
    this.loginService.login(this.username, this.password)
    .pipe()
    .subscribe(res => {
      if (res) {
        let user = {
          token: res.token,
          _id: res.user._id,
          username: res.user.username
        }
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigateByUrl('/main');
      }
      else {
        console.log("Wrong credentials");
      };
    });
  }

}
