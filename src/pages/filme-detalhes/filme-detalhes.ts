import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';

/**
 * Generated class for the FilmeDetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filme-detalhes',
  templateUrl: 'filme-detalhes.html',
  providers: [
    MovieProvider
  ]
})
export class FilmeDetalhesPage {
  private filme = new Array<any>();
  private filmeId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private movieProvider: MovieProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilmeDetalhesPage');
    this.filmeId = this.navParams.get("id");
    console.log(this.filmeId);
    this.carregaFilmeDetalhes();
  }

  carregaFilmeDetalhes() {
    this.movieProvider.getMovie(this.filmeId).subscribe(
      data => {
        this.filme = JSON.parse(JSON.stringify(data));
        console.log(this.filme);
      },
      error => {
        console.log(error);
      }
    );
  }

}
