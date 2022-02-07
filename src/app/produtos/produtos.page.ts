import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';
import { error } from 'protractor';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  items: ProdutoDTO[];
  currency;

  constructor(public navCtrl: NavController, public route: ActivatedRoute,
    public produtoService: ProdutoService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.route.queryParams.subscribe(params => {
      this.currency = JSON.parse(params['categoria_id'])
    })
    this.produtoService.findByCategoria(this.currency)
      .subscribe(response => {
        this.items = response['content'];
        console.log(this.items)
        this.loadImageUrls();
      },
        error => { });
  }

  loadImageUrls() {
    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      item.imageUrl = `assets/imgs/produtos/prod${item.id}.png`;
    }
  }

  showDetail() {
    this.navCtrl.navigateRoot('produto-detail')
  }

}
