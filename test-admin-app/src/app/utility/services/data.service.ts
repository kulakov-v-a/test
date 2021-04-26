import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private auth:AuthService) {}

  public getDataByType<T>(type:string, searchStr = null)
  {
    return this.http.get<T>(environment.pathDataByType + type + '?userId=' + this.auth.getUser().id + (searchStr? '&q=' + searchStr:'')).toPromise()
  }
  public deleteData(type:string, id:number)
  {
    return this.http.delete(environment.pathDataByType + type + '/' + id).toPromise()
  }

  public insertData(type:string,data:any)
  {
    return this.http.post(environment.pathInsertDataByType + type,data).toPromise()
  }
  public updateData(type:string, data:any)
  {
    return this.http.patch(environment.pathUpdateDataByType + type +'/'+ data['id'],data).toPromise()
  }
}
