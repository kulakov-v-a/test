import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

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
        console.log(response)
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
  }

    

}
