import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { TokenInterceptor } from './shared/api/interceptor/token.interceptor';

const routes: Routes = [
  {
    path: "",
    redirectTo: "auth/login",
    pathMatch: "full"
  },

  {
    path: "auth",
    loadChildren: () => import('./auth/auth.module').then( (m => m.AuthModule)),
  //   canActivate: [NoAuthGuard]
  },
  {
    path: "",
    loadChildren: () => import('./home/home.module').then( (m => m.HomeModule))
  },

  {
    path: '**',
    redirectTo: "auth/login",
    pathMatch: "full"
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
