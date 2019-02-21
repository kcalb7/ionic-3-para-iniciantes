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
  private obj_feed = {
    titulo: "Douglas Braga",
    data: "2019-02-05",
    descricao: "Alguma coisa nada a ver....",
    qtd_likes: 12,
    qtd_comments: 5,
    time_comment: "11h ago"
  }
  private array_movies;

  constructor(public navCtrl: NavController, public navParams: NavParams, private movieProvider: MovieProvider) {
  }

  getObj_feed() {
    return this.obj_feed;
  }

  setArray_movies () {
    this.array_movies = this.movieProvider.getLatestMovies().subscribe(
                          data=>{
                            console.log(data);
                          }, error=>{
                            console.log(error);
                          }
                        )
  }

  getArray_movies(){
    return this.array_movies;
  }

  ionViewDidLoad() {
    this.setArray_movies();
    console.log('ionViewDidLoad FeedPage');
  }

}
