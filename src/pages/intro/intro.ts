import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { MovieProvider } from '../../providers/movie/movie';

/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
  providers: [
    MovieProvider
  ]
})
export class IntroPage {
  private latest_movie = new Array<any>();

  constructor(public navCtrl: NavController, public navParams: NavParams, private movieProvider: MovieProvider) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
    this.setLatest_movie();
  }

  setLatest_movie() {
    this.movieProvider.getLatestMovie().subscribe(
      data => {
        const response = JSON.parse(JSON.stringify(data)).results;
        this.latest_movie = response[0];
        // console.log(this.getLatest_movie());
      },
      error => {
        console.log(error);
      }
    )
  }

  getLatest_movie() {
    return this.latest_movie;
  }

  gototabs() {
    this.navCtrl.push(TabsPage);
  }

}
