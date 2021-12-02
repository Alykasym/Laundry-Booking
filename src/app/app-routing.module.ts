import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordPageModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfilePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile/edit',
    loadChildren: () =>
      import('./profile-edit/profile-edit.module').then(
        (m) => m.ProfileEditPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'change-password',
    loadChildren: () =>
      import('./change-password/change-password.module').then(
        (m) => m.ChangePasswordPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'reservation',
    loadChildren: () =>
      import('./reservation/reservation.module').then(
        (m) => m.ReservationPageModule
      ),
  },
  {
    path: 'my-reservations',
    loadChildren: () =>
      import('./my-reservations/my-reservations.module').then(
        (m) => m.MyReservationsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'randomcode',
    loadChildren: () =>
      import('./randomcode/randomcode.module').then(
        (m) => m.RandomcodePageModule
      ),
  },
  {
    path: 'feedback',
    loadChildren: () =>
      import('./feedback/feedback.module').then((m) => m.FeedbackPageModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./not-found/not-found.module').then((m) => m.NotFoundPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
