import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginCredentials } from 'src/app/interfaces/user/login-credentials';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _login: LoginService
    ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      password: [null, [Validators.required]],
    });
  }

  public login() {
    if (!this.form.valid) return;

    const credentials: LoginCredentials = {
      identifier: this.form.value.name,
      password: this.form.value.password
    }
    this._login.login(credentials);
  }
}
