import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage {

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(
    private router: Router,
    public menuController: MenuController
  ) { }

  login() {
    console.log("Logado!");
    console.log(this.creds);
    this.router.navigate(['categorias']);
  }

  // Desabilita o menu dentro da tela inicial
  ionViewWillEnter() {
    this.menuController.swipeGesture(false);
  }

  // Habilita o menu ao sair da tela inicial
  ionViewWillLeave() {
    this.menuController.swipeGesture(true);
  }
  

}
