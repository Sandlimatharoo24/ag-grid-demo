import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpHeaders, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from "rxjs/operators";

// Set the http options
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json", "Authorization": "c31z" })
};

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    constructor(private http: HttpClient) { }
        gridDataUrl = 'assets/config.json';

private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError(error);
  }

   private extractData(res: Response) {
    let body = res;
    return body || {};
  }



    getConfig() : Observable<any> {
        return this.http.get(this.gridDataUrl).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
    }
}
