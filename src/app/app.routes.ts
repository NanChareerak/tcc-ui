import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { Welcome } from './features/auth/welcome/welcome';
import { MainLayout } from './features/layout/main-layout/main-layout';
import { Dashboard } from './features/pages/dashboard/dashboard';
import { ModulePlaceholder } from './features/pages/module-placeholder/module-placeholder';
import { PersonHome } from './features/it01-person/person-home/person-home';
import { ProfileHome } from './features/it04-profile/profile-home/profile-home';
import { QrcodeHomeComponent } from './features/it07-qrcode/qrcode-home/qrcode-home';
import { BarcodeHome } from './features/it06-barcode/barcode-home/barcode-home';
import { QuizHomeComponent } from './features/it08-quiz/quiz-home/quiz-home';
import { CommentHomeComponent } from './features/it09-comment/comment-home/comment-home';
import { ApprovalHomeComponent } from './features/it03-approval/approval-home/approval-home';

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
      { path: 'it02-auth', component: Login, data: { title: 'IT02 - Auth' } },
      { path: 'it03-approval', component: ApprovalHomeComponent, data: { title: 'IT03 - Approval' } },
      { path: 'it04-profile', component: ProfileHome, data: { title: 'IT04 - Profile' } },
      { path: 'it05-queue', component: QrcodeHomeComponent, data: { title: 'IT05 - Queue' } },
      { path: 'it06-barcode', component: BarcodeHome, data: { title: 'IT06 - Barcode' } },
      { path: 'it07-qrcode', component: QrcodeHomeComponent, data: { title: 'IT07 - QRCode' } },
      { path: 'it08-quiz', component: QuizHomeComponent, data: { title: 'IT08 - Quiz' } },
      { path: 'it09-comment', component: CommentHomeComponent, data: { title: 'IT09 - Comment' } },
      { path: 'it10-dashboard', component: Dashboard, data: { title: 'IT10 - Dashboard' } },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },

  { path: '**', redirectTo: 'login' },
];
