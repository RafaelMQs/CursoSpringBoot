
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Profile', url: 'profile', icon: 'person-circle' },
    { title: 'Categorias', url: 'categorias', icon: 'apps' },
    { title: 'Logout', url: '', icon: 'log-out' },
  ];
  constructor(public authService: AuthService, public router: Router) { }

  openPage(p) {
    this.router.navigate([p.url]);
    switch (p.title) {
      case 'Logout':
        this.authService.logout();
    }
  }
}
