import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { user } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private router:Router) { }

  public isAuthorized:boolean = false

  private userInstance:user

  public getUser():user
  {
    return this.userInstance
  }

  public login(login:string, password:string)
  {
      return this.http.get<user[]>(environment.pathLogin + `?login=${login}&password=${password}`)
      .toPromise().then(response=>{
        if(response.length > 0)
        {
          this.isAuthorized = true
          this.userInstance = response[0]
          return true
        }
        else
          return false
      })
  }
  public logout()
  {
    this.isAuthorized = false
    this.userInstance = null
    this.router.navigate(['login'])
  }



}
