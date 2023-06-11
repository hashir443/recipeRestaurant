import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppHttpService } from 'src/app/shared/api/http-api-service';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { validate } from 'src/app/shared/helper/form.helper';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  user = new User();
  router!: Router;

  URL = {
    login: 'auth/local',
    getUserInfo: ''
  }

  constructor(private fb: FormBuilder,
    private appHttp: AppHttpService){

  }
  ngOnInit(): void {
    this.loginForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      Email: [
        '',
        [
          Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
          Validators.required,
        ],
      ],
      Password: [
        '',[Validators.required]
      ]
    });
  }

  submitModalData(form: FormGroup) {
    if (form.invalid) {
      validate(form);
      return;
    }
    this.submitContactInformation();
  }

  submitContactInformation() {
    const obj = {
      identifier : this.loginForm.value.Email,
      password : this.loginForm.value.Password,
    };
    this.appHttp.post(obj ,this.URL.login).subscribe({
      next:(res)=>{
        if (res.data.jwt != "") {
          this.user.token = res.data.jwt;
          AuthGuard.login(this.user);
          // this.router.navigate(['/dashboard']);
        }
      },
      error: (e) => {
        console.log(e)
      }
    });
  }

  get f() {
    return this.loginForm.controls;
  }

}
