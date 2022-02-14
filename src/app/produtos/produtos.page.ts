import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { LoadingController, NavController, NavParams } from '@ionic/angular';
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
  isLoading = false;

  constructor(public navCtrl: NavController, public route: ActivatedRoute,
    public produtoService: ProdutoService, public loadingController: LoadingController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.route.queryParams.subscribe(params => {
      this.currency = JSON.parse(params['categoria_id'])
    })
    this.presentLoading();
    this.produtoService.findByCategoria(this.currency)
      .subscribe(response => {
        this.items = response['content'];
        this.loadImageUrls();
        this.dismiss();
      },
        error => {
          this.dismiss();
        });
  }

  loadImageUrls() {
    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      item.imageUrl = `assets/imgs/produtos/prod${item.id}.png`;
    }
  }

  showDetail(produto_id: string) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        categoria_id: JSON.stringify(produto_id)
      }
    }
    this.navCtrl.navigateRoot('produto-detail', navigationExtras)
  }

  goToCart() {
    this.navCtrl.navigateRoot('cart')
  }

  async presentLoading() {
    this.isLoading = true;
    return await this.loadingController.create({
      message: 'Aguarde',
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss();
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
  }


}
