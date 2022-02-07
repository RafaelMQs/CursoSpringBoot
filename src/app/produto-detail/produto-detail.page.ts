import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.page.html',
  styleUrls: ['./produto-detail.page.scss'],
})
export class ProdutoDetailPage implements OnInit {

  item: ProdutoDTO;
  currency;

  constructor(public produtoService: ProdutoService, public route: ActivatedRoute) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.route.queryParams.subscribe(params => {
      this.currency = JSON.parse(params['categoria_id'])
    })
    this.produtoService.findById(this.currency)
      .subscribe(response => {
        this.item = response;
        this.loadImageUrls();
      },
        error => { });
  }

  loadImageUrls() {
    this.item.imageUrl = `assets/imgs/produtos/prod${this.item.id}.png`;
  }
}


