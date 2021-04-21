import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private auth:AuthService) {}

  public getDataByType<T>(type:string)
  {
    return this.http.get<T>(environment.pathDataByType + type + '?userId=' + this.auth.getUser().id).toPromise()
  }
}
