import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    //Habilita HttpClient para toda la aplicacion, con esto consumimos las Api de .Net
    provideHttpClient(),
    //Habilita el sistema de ruteo
    provideRouter(routes)
  ]
};
