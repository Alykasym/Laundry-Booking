import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  fname: string;
  email: string;
  feedback: string;

  constructor(
    private toastr: ToastController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {}

  async submit() {
    const loading = await this.loadingCtrl.create({
      message: 'processing..',
      spinner: 'crescent',
      showBackdrop: true,
    });
    loading.present();
    if (this.fname && this.email && this.feedback) {
      loading.dismiss();
      this.toast('Thank you for your feedback!', 'success');
      this.router.navigate(['/home']);
    } else {
      loading.dismiss();
      this.toast('Please fill up all fields', 'warning');
    }
  }

  async toast(message, status) {
    const toast = await this.toastr.create({
      message: message,
      color: status,
      position: 'top',
      duration: 2000,
    });
    toast.present();
  } //end of toast
}
