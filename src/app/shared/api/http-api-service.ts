import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/shared/api/api.service';


@Injectable({
  providedIn: 'root'
})
export class AppHttpService extends ApiService {

  post(obj: any, endPoint: string) {
       return this.http.post(environment.baseURL + endPoint, obj).pipe(this.handleRequest().bind(this));
  }

  get(endPoint: string, skip?: string) {
    if(skip && skip == 'skip')
      return this.http.get((environment.baseURL + endPoint), {headers:{skip:"true"}}).pipe(this.handleRequest().bind(this));
    return this.http.get(environment.baseURL + endPoint).pipe(this.handleRequest().bind(this));
  }

  delete(endPoint: string) {
    return this.http.delete(environment.baseURL + endPoint).pipe(this.handleRequest().bind(this));
  }

  update(obj: any, endPoint: string) {
    return this.http.put(environment.baseURL + endPoint, obj).pipe(this.handleRequest().bind(this));
  }

}
