import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieProvider {
  private url_base = "https://api.themoviedb.org/3";
  private api_key = "?api_key=5b4e5258f93462e38e9837f0649c0784";

  constructor(public http: HttpClient) {
    console.log('Hello MovieProvider Provider');
  }

  getLatestMovies() {
    return this.http.get(this.url_base + "/movie/latest" + this.api_key);
  }

}
