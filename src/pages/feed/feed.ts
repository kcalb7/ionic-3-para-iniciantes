import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MovieProvider
  ]
})
export class FeedPage {
  private array_movies = new Array<any>();

  constructor(public navCtrl: NavController, public navParams: NavParams, private movieProvider: MovieProvider) {
  }

  setArray_movies() {
    this.movieProvider.getPopularMovies().subscribe(
      data => {
        const response = (JSON.stringify(data));
        const obj_retorno = JSON.parse(response).results;
        this.array_movies = obj_retorno;
        console.log(this.getArray_movies());
      }, error => {
        console.log(error);
      }
    )
  }

  getArray_movies() {
    return this.array_movies;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedPage');
    this.setArray_movies();
  }

}
