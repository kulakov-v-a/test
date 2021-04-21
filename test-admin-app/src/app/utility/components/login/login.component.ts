import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.auth.login('admin','12345')
    .then(response =>{
      if(response)
        this.router.navigate(['administration','contacts'])
      else
        this.isCorrectData = false
    })
  }

  public isCorrectData:boolean = true

  login(e)
  {
    if(this.loginForm.valid)
    {

    }
  }

  public loginForm : FormGroup = new FormGroup({
    login : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required])
  })
}
