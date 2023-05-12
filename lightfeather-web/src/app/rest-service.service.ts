import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestServiceService {

  constructor(private http: HttpClient) { }

  postData(postData: any) {
    return this.http.post('http://localhost:8080/api/submit', postData)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMsg: string;
    if (error.error instanceof ErrorEvent) {
      
      errorMsg = `An error occurred: ${error.error.message}`;
    } else {
         console.log(error.error)
         errorMsg = `Server returned code: ${error.status},error message is: ${error.message}`;
  
      if (error.error && error.error.errors) {
        errorMsg += ' ' + error.error.errors.join(',');
      }
      if(error.error){
        errorMsg += Object.values(error.error).join(',');
      }
    }
    return throwError(errorMsg);
  }

}


