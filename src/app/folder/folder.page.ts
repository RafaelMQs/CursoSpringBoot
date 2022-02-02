import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

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
    public menuController: MenuController,
    public auth: AuthService
  ) { }

  login() {
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.router.navigate(['categorias']);
      },
        error => {}
    )
  }

  signup() {
    this.router.navigate(['signup'])
  }

  ionViewDidEnter() {
    this.menuController.swipeGesture(false);
    this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.router.navigate(['categorias']);
      },
        error => { }
      )
  }

  // Habilita o menu ao sair da tela inicial
  ionViewWillLeave() {
    this.menuController.swipeGesture(true);
  }
  

}
