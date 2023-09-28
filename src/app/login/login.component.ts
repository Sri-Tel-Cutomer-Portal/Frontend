import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../Response/user';
import * as shajs from 'sha.js';
import { LoginService } from '../service/login.service';
import { AuthService } from '../service/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  user: User = new User();

  constructor(
    private fb: FormBuilder,
    private loginuserservice: LoginService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  onLogin() {
    this.user.userName = this.loginForm.get('email').value;
    this.user.password = shajs('sha256')
      .update(this.loginForm.get('password').value)
      .digest('hex');
    const userName = this.user.userName;
    const password = this.user.password;

    this.authService.login(userName, password);
  }
}
