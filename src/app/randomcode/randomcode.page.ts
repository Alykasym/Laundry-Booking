import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { PickerController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';

import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-randomcode',
  templateUrl: './randomcode.page.html',
  styleUrls: ['./randomcode.page.scss'],
})
export class RandomcodePage implements OnInit {
  result: string;
  length: number;
  chars: string;
  userId: string;

  constructor(
    private toastr: ToastController,
    private auth: AuthService,
    private router: Router,
    public pickerCtrl: PickerController,
    private afs: AngularFirestore,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.randomString();
    this.auth.user$.subscribe((user) => {
      this.userId = user.userId;
    });
  }
  randomString() {
    this.result = '';
    this.length = 6;
    this.chars = '0123456789';
    for (var i = this.length; i > 0; --i)
      this.result += this.chars[Math.floor(Math.random() * this.chars.length)];
    return this.result;
  }
  gotoHome() {
    this.router.navigate(['/home']);
  }
}
