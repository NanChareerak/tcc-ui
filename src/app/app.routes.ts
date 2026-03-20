import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { Welcome } from './features/auth/welcome/welcome';
import { MainLayout } from './features/layout/main-layout/main-layout';
import { Dashboard } from './features/pages/dashboard/dashboard';
import { ModulePlaceholder } from './features/pages/module-placeholder/module-placeholder';
import { PersonHome } from './features/it01-person/person-home/person-home';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'welcome', component: Welcome },

  {
    path: 'app',
    component: MainLayout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },

      { path: 'it01-person', component: PersonHome, data: { title: 'IT01 - Person' } },
      { path: 'it02-auth', component: ModulePlaceholder, data: { title: 'IT02 - Auth' } },
      { path: 'it03-approval', component: ModulePlaceholder, data: { title: 'IT03 - Approval' } },
      { path: 'it04-profile', component: ModulePlaceholder, data: { title: 'IT04 - Profile' } },
      { path: 'it05-queue', component: ModulePlaceholder, data: { title: 'IT05 - Queue' } },
      { path: 'it06-barcode', component: ModulePlaceholder, data: { title: 'IT06 - Barcode' } },
      { path: 'it07-qrcode', component: ModulePlaceholder, data: { title: 'IT07 - QRCode' } },
      { path: 'it08-quiz', component: ModulePlaceholder, data: { title: 'IT08 - Quiz' } },
      { path: 'it09-comment', component: ModulePlaceholder, data: { title: 'IT09 - Comment' } },
      { path: 'it10-dashboard', component: ModulePlaceholder, data: { title: 'IT10 - Dashboard' } }
    ]
  },

  { path: '**', redirectTo: 'login' }
];