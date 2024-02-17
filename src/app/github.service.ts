import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private apiUrl = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  getUserSuggestions(query: string): Observable<string[]> {
    const url = `${this.apiUrl}/search/users?q=${query}`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  getUser(username: string): Observable<any> {
    const url = `${this.apiUrl}/users/${username}`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  getRepos(username: string): Observable<any[]> {
    const url = `${this.apiUrl}/users/${username}/repos`;
    return this.http.get<any[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred.';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
