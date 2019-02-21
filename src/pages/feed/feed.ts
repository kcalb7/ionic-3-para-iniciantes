import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
})
export class FeedPage {
  private nome_usuario: string = "Douglas Braga";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  getNome_usuario() {
    return "user: " + this.nome_usuario;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedPage');
  }

}
