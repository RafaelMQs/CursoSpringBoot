import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CartItem } from '../../models/cart-item';
import { ClienteDTO } from '../../models/cliente.dto';
import { EnderecoDTO } from '../../models/endereco.dto';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../services/domain/cart.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { PedidoService } from '../../services/domain/pedido.service';

@Component({
  selector: 'app-order-confimation',
  templateUrl: './order-confimation.page.html',
  styleUrls: ['./order-confimation.page.scss'],
})
export class OrderConfimationPage implements OnInit {

  pedido: PedidoDTO;
  cartItems: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;

  constructor(public route: ActivatedRoute, public cartService: CartService, public clienteService: ClienteService,
    public navCtrl: NavController, public pedidoService: PedidoService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.pedido = params['pedido']
    });
  }

  ionViewDidEnter() {
    this.cartItems = this.cartService.getCart().items;

    this.clienteService.findById(this.pedido.cliente.id)
      .subscribe(response => {
        this.cliente = response as ClienteDTO;
        this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id, response['enderecos'])
      },
        error => {
          this.navCtrl.navigateRoot('');
        }
    );
  }

  private findEndereco(id: string, list: EnderecoDTO[]): EnderecoDTO {
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  back() {
    this.navCtrl.navigateRoot('cart')
  }

  total() {
    return this.cartService.total();
  }

  checkout() {
    this.pedidoService.insert(this.pedido)
      .subscribe(response => {
        this.cartService.createOrClearCart();
        console.log(response.headers.get('location'))
      },
        error => {
          if (error.status == 403) {
            this.navCtrl.navigateRoot('')
          }
        }
    )
  }
}
