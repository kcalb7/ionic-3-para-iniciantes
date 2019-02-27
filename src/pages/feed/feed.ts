import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
  private loader;
  private refresher;
  private isRefreshing = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private movieProvider: MovieProvider,
    public loadingCtrl: LoadingController) { }

  async presentLoading() {
    this.loader = await this.loadingCtrl.create({
      content: "Aguarde.."
    });
    await this.loader.present();
  }

  doRefresh(event) {
    this.setArray_movies();
    this.refresher = event;
    this.isRefreshing = true;
  }

  closeLoading() {
    this.loader.dismiss();
  }

  getArray_movies() {
    return this.array_movies;
  }

  setArray_movies() {
    this.presentLoading();
    this.movieProvider.getPopularMovies().subscribe(
      data => {
        const response = JSON.parse(JSON.stringify(data)).results;
        this.array_movies = response;
        // console.log(this.getArray_movies());
        this.closeLoading();
        if(this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }, error => {
        console.log(error);
        this.closeLoading();
        if(this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedPage');
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter FeedPage');
    this.setArray_movies();
  }

}
