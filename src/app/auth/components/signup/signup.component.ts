import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppHttpService } from 'src/app/shared/api/http-api-service';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { validate } from 'src/app/shared/helper/form.helper';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm!: FormGroup;
  user = new User();

  URL = {
    register: 'auth/local/register',
  }

  constructor(
    private fb: FormBuilder,
    private appHttp: AppHttpService,
    private router: Router
    ){

  }
  ngOnInit(): void {
    this.registerForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      email: [
        '',
        [
          Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
          Validators.required,
        ],
      ],
      password: [
        '',[Validators.required]
      ],
      username: ['', Validators.required],
      userRole: [
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
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      userRole: this.registerForm.value.userRole,
    };
    this.appHttp.post(obj ,this.URL.register).subscribe({
      next:(res)=>{
        if (res.data.jwt != "") {
          console.log("Account created");
          this.router.navigate(['/auth/login']);
        }
      },
      error: (e) => {
        console.log(e)
      }
    });
  }

  get f() {
    return this.registerForm.controls;
  }

}
