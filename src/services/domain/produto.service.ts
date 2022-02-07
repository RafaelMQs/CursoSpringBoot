import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";
import { CidadeDTO } from "../../models/cidade.dto";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class ProdutoService {

  constructor(public http: HttpClient) {
  }

  findByCategoria(categoria_id: string){
    return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`);
  }

  findById(produto_id: string) {
    return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`)

  }

}
