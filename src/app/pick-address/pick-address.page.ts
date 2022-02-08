import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-pick-address',
  templateUrl: './pick-address.page.html',
  styleUrls: ['./pick-address.page.scss'],
})
export class PickAddressPage implements OnInit {

  items: EnderecoDTO[];

  constructor(public storage: StorageService, public clienteService: ClienteService, public navCtrl: NavController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['enderecos'];
        },
          error => {
            if (error.status == 403) {
              this.navCtrl.navigateRoot('');
            }
          }
        )
    } else {
      this.navCtrl.navigateRoot('');
    }
  }

}
