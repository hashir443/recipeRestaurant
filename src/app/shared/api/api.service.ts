import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';

@Injectable()
export class ApiService {
    constructor(protected http: HttpClient) {
    }
    handleRequest() {
        let that = this;
        return function(observable: Observable<any>) {
            return observable.pipe(
                map((result) => {
                    return that.extractData(result);
                }),
                catchError((error) => {
                    return that.handleError(error)
                })
            );
        }
    }
    /*
      Extract JSON Object from Response
    */
    protected extractData(res: Response) {

      if (res.status < 200 || res.status >= 300) {
        return this.handleError(res);
      }
      return this.complete({ status: res.status , data: res || ''});
    }

    /*
      The Error Handler from HTTP
    */
    protected handleError(error: any): any {

      let message = "Something went wrong please again later";
      if (error.status == 431) {
        message = "Your phone number is not verified"
      }
      if (error.status == 430) {
        message = "Please register yourself"
      }
      let errors = error.error?.errors;
      if(errors && errors.length > 0) {
        message = '';
        errors.forEach( (element: any) => {
          message += (' ' + element.errorMessage);
        });
      }

     let obj = { status: error.status , message}
        return this.complete(throwError(obj));
    }

    protected complete(obj: any) {
      setTimeout(() => {

      }, 1000);
      return obj;
    }
}
