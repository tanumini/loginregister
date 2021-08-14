import { Route } from '@angular/compiler/src/core';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../_services';

@Component({

  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  loading=false;
  submitted=false;
  error='';
  
  constructor(
    private authenticationService:AuthenticationService,
    private formBuilder:FormBuilder,
    private router:Router,
    private route:ActivatedRoute
  ) 
  {
    if(this.authenticationService.userValue)
    {
      this.router.navigate(['/']);
    }
   }

  ngOnInit(): void {

    this.loginForm=this.formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required]
    });
  }
  get f()
{
  return this.loginForm.controls;
}
  onSubmit()
  {
    this.submitted=true;
    if(this.loginForm.invalid)
    return;
    this.loading=true;
    this.authenticationService.login(this.f.username.value,this.f.password.value).
    pipe(first()).subscribe({
      next: () => {
        // get return url from query parameters or default to home page
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl(returnUrl);
    },
    error: error => {
        this.error = error;
        this.loading = false;
    }}
    )
  }
  }
