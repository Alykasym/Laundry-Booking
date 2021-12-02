import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.page.html',
  styleUrls: ['./my-reservations.page.scss'],
})
export class MyReservationsPage implements OnInit {
  user: any;
  userId: string;
  storedData: any = [];

  constructor(private auth: AuthService, private afs: AngularFirestore) {}

  ngOnInit() {
    this.fetchBookings();
    this.auth.user$.subscribe((user) => {
      this.userId = user.userId;
    });
  }

  fetchBookings() {
    this.afs
      .collection('user')
      .doc(this.userId)
      .collection('BookingHistory')
      .get()
      .subscribe((querySnapshot) => {
        this.storedData = querySnapshot.docs.map((e) => {
          return {
            bookingDate: e.data()['Merge'],
          };
        });
      });
  }
}
