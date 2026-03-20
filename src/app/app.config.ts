import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';

import th from '@angular/common/locales/th';
import { NZ_I18N, th_TH } from 'ng-zorro-antd/i18n';

import { routes } from './app.routes';

registerLocaleData(th);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    { provide: NZ_I18N, useValue: th_TH }
  ]
};