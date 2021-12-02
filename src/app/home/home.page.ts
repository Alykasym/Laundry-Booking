import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user: any;

  constructor(
    private auth: AuthService,
    private router: Router,
    private menu: MenuController
  ) {}

  openFirst() {
    this.menu.enable(true, 'menu-content');
    this.menu.open('menu-content');
  }

  ngOnInit() {
    this.auth.user$.subscribe((user) => {
      this.user = user;
    });
  }

  logout() {
    this.auth.signOut();
  }

  gotoProfile() {
    this.router.navigate(['/profile']);
  }

  gotoFeedback() {
    this.router.navigate(['/feedback']);
  }

  res() {
    this.router.navigate(['/reservation']);
  }
}
