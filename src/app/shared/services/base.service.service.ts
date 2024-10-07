import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError, Observable, retry, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {

  protected httOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  protected http: HttpClient = inject(HttpClient);

  protected basePath: string = `${environment.serverBasePath}`;

  protected resourceEndpoint: string = '/resources';

  protected handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(`An error occurred: ${error.error.message}`);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  private resourcePath() {
    return `${this.basePath}${this.resourceEndpoint}`;
  }

  public create(item: any): Observable<T> {
    return this.http.post<T>(this.resourcePath(), JSON.stringify(item), this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public delete(id: any): Observable<any> {
    return this.http.delete(`${this.resourcePath()}/${id}`, this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public update(id: any, item: any): Observable<T> {
    return this.http.put<T>(`${this.resourcePath()}/${id}`, JSON.stringify(item), this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.resourcePath(), this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public getById(id: any): Observable<T> {
    return this.http.get<T>(`${this.resourcePath()}/${id}`, this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
