

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {
  private http = inject(HttpClient);
  private API_URL = 'https://api.themoviedb.org/3/';
  private API_KEY = 'a55f8821d041d97b59437de4af51cfd1'; 
  
  private httpOptions = {
    headers: new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTVmODgyMWQwNDFkOTdiNTk0MzdkZTRhZjUxY2ZkMSIsIm5iZiI6MTc0MjYyNDkzNy40OTYsInN1YiI6IjY3ZGU1OGE5YzI4NDA0ZTYyOWY1NzIwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iHaW1Czu0W8nMJWcSX3klNPa4B29mtC4h9TQzkdOeUQ`
    }),
    params: new HttpParams()
      .set('include_adult', 'false')
      .set('include_video', 'true')
      .set('language', 'en-US')
      .set('page', '1')
      .set('sort_by', 'popularity.desc')
  };

  getMovies(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}movie/popular`, this.httpOptions);
  }

  getTopRated(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}movie/top_rated`,this.httpOptions);
  }

  upComing(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}movie/upcoming`,this.httpOptions)
  }
}
