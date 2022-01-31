import { Component, OnInit } from '@angular/core';
import { CategoriaDTO } from '../../models/categoria.dto';
import { CategoriaService } from '../../services/domain/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  items: CategoriaDTO[];

  constructor(
    public categoriaService: CategoriaService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.categoriaService.findAll().subscribe(response => {
      this.items = response;
    },
      error => {});

  }
}
