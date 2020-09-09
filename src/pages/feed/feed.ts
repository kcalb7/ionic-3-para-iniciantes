import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';

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
  private infiniteScroll;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private movieProvider: MovieProvider,
    public loadingCtrl: LoadingController) { }
  private page = 1;

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Aguarde.."
    });
    this.loader.present();
  }

  closeLoading() {
    this.loader.dismiss();
  }

  doRefresh(event) {
    this.setArray_movies();
    this.refresher = event;
    this.isRefreshing = true;
    this.page = 1;
  }

  loadData(event) {
    this.page++;
    this.infiniteScroll = event;
    this.setArray_movies(true);
  }

  getArray_movies() {
    return this.array_movies;
  }

  abrirDetalhes(filme) {
    this.navCtrl.push(FilmeDetalhesPage, { id: filme });
    console.log(filme);
  }

  setArray_movies(newPage: boolean = false) {
    this.presentLoading();
    this.movieProvider.getPopularMovies(this.page).subscribe(
      data => {
        const response = JSON.parse(JSON.stringify(data)).results;

        if (newPage){
          this.array_movies = this.array_movies.concat(response);
          this.infiniteScroll.complete();
        }
        else
          this.array_movies = response;

        // console.log(this.getArray_movies());
        if (this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
        this.closeLoading();
      }, error => {
        console.log(error);
        this.closeLoading();
        if (this.isRefreshing) {
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
    this.setArray_movies();
    console.log('ionViewDidEnter FeedPage');
  }

}
