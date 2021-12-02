import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { PickerController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { formatDate, NgIf } from '@angular/common';

import firebase from 'firebase/compat/app';
import 'firebase/firestore';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {
  user: any;
  timeslot = '';
  currentDate = new Date(Date.now());
  currentDate1 = new Date(Date.now());
  endDate = this.currentDate1.setDate(this.currentDate1.getDate() + 6);
  userId: string;
  bookingDate: string;
  bookingTime: string;
  bookingId: string;
  storedData: any = [];
  testData: any;
  bDate: any = [];
  bTime: any = [];
  finalarray: any = [];
  status: string;
  timeslotLimit: string;
  array1: any = [];
  array2: any = [];
  countTimeslots: number;
  countDate: number;
  result: string;
  length: number;
  chars: string;

  constructor(
    private afauth: AngularFireAuth,
    private auth: AuthService,
    private router: Router,
    public pickerCtrl: PickerController,
    private afs: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastr: ToastController
  ) {}

  ngOnInit() {
    this.auth.user$.subscribe((user) => {
      this.userId = user.userId;
    });
  }

  async reservation() {
    const loading = await this.loadingCtrl.create({
      message: 'processing..',
      spinner: 'crescent',
      showBackdrop: true,
    });

    this.result = '';
    this.length = 6;
    this.chars = '0123456789';
    for (var i = this.length; i > 0; --i)
      this.result += this.chars[Math.floor(Math.random() * this.chars.length)];

    loading.present();
    var path = await this.afs
      .collection('user')
      .doc(this.userId)
      .collection('BookingHistory')
      .doc('BookingList');

    const checkExist = this.afs
      .collection('user')
      .doc(this.userId)
      .collection('BookingHistory');

    var bookingList = this.afs.collectionGroup('BookingHistory');
    bookingList.get().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        for (let value of doc.data()['Timeslots']) {
          this.array1.push(value);
        }
        for (let value of doc.data()['BookingDate']) {
          this.array2.push(value);
        }
      });
      console.log('Array1 - Time: ', this.array1);
      console.log('Array 2 - Date: ', this.array2);
      if (this.bookingDate && this.timeslot) {
        this.countTimeslots = this.array1.filter(
          (x) => x == this.timeslot
        ).length;
        console.log(this.countTimeslots);

        this.countDate = this.array2.filter(
          (x) => x == formatDate(this.bookingDate, 'MMMM dd yyyy', 'en-US')
        ).length;
        console.log(this.countDate);
      }
    });

    checkExist.get().subscribe((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (this.bookingDate && this.timeslot) {
          if (
            doc
              .data()
              ['BookingDate'].includes(
                formatDate(this.bookingDate, 'MMMM dd yyyy', 'en-US')
              )
          ) {
            loading.dismiss();
            this.toast('You have already booked for this date!', 'warning');
          } else if (this.countTimeslots > 2 && this.countDate > 2) {
            loading.dismiss();
            this.toast(
              'Sorry, all machines for this timeslot in this date has been booked!',
              'warning'
            );
          } else if (
            !doc
              .data()
              ['BookingDate'].includes(
                formatDate(this.bookingDate, 'MMMM dd yyyy', 'en-US')
              )
          ) {
            for (let value of doc.data()['Merge']) {
              this.bTime.push(value);
            }
            this.bTime.push({
              Date: formatDate(this.bookingDate, 'MMMM dd yyyy', 'en-US'),
              Time: this.timeslot,
              Code: this.result,
              BookedAt: new Date(Date.now()),
            });
            for (let value of doc.data()['Timeslots']) {
              this.bDate.push(value);
            }
            this.bDate.push(this.timeslot);

            console.log(this.bTime);
            path
              .update({
                BookingDate: firebase.firestore.FieldValue.arrayUnion(
                  formatDate(this.bookingDate, 'MMMM dd yyyy', 'en-US')
                ),
                Merge: this.bTime,
                Timeslots: this.bDate,
              })
              .then(() => {
                console.log('Document successfully written! ');
                loading.dismiss();
                this.toast('Booking success!', 'success');
                this.router.navigate(['/randomcode']);
              })
              .catch((error) => {
                loading.dismiss();
                this.toast(error.message, 'danger');
              });
          }
        } else {
          loading.dismiss();
          this.toast('Please fill up all fields', 'warning');
        }
      });
    });
    this.bTime = [];
    this.array1 = [];
    this.array2 = [];
    this.countDate = 0;
    this.countTimeslots = 0;
  } //end of reservation

  async toast(message, status) {
    const toast = await this.toastr.create({
      message: message,
      color: status,
      position: 'top',
      duration: 2000,
    });
    toast.present();
  } //end of toast

  logout() {
    this.auth.signOut();
  }

  gotoProfile() {
    this.router.navigate(['/profile']);
  }

  res() {
    this.router.navigate(['reservation']);
  }

  async openPicker() {
    const picker = await this.pickerCtrl.create({
      columns: [
        {
          name: 'timeslot',
          options: [
            { text: '8 AM - 9 AM', value: '1' },
            { text: '9 AM - 10 AM', value: '2' },
            { text: '10 AM - 11 AM', value: '3' },
            { text: '11 AM - 12 PM', value: '4' },
            { text: '12 PM - 1 PM', value: '5' },
            { text: '1 PM - 2 PM', value: '6' },
            { text: '2 PM - 3 PM', value: '7' },
            { text: '3 PM - 4 PM', value: '8' },
            { text: '4 PM - 5 PM', value: '9' },
            { text: '5 PM - 6 PM', value: '10' },
            { text: '6 PM - 7 PM', value: '11' },
            { text: '7 PM - 8 PM', value: '12' },
            { text: '8 PM - 9 PM', value: '13' },
            { text: '9 PM - 10 PM', value: '14' },
          ],
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (value) => {
            console.log('Got Value', value);
          },
        },
        {
          text: 'Confirm',
          handler: (value) => {
            console.log('Got Value', value);
          },
        },
      ],
    });

    await picker.present();

    picker.onDidDismiss().then(async (data1) => {
      let col = await picker.getColumn('timeslot');
      console.log('col: ', col);
      this.timeslot = col.options[col.selectedIndex].text;
    });
  }
}
