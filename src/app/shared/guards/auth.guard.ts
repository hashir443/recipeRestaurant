import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { GLOBAL } from '../global.config';
import { JwtService } from '../services/jwt.servcie';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User, UserFactory } from '../models/user.model';

const jwtHelper = new JwtHelperService();

@Injectable()
export class AuthGuard implements CanActivate {
  protected static userString = 'user';
  protected static tokenSrting = 'token';
  protected static refreshTokenStr = 'refreshToken';
  protected static jwtHelperService: JwtService;
  constructor(public router: Router, private jwtService: JwtService) {
    AuthGuard.jwtHelperService = this.jwtService;
  }

  public static isLoggedIn(): boolean {
    let token = AuthGuard.getToken();
    let u = localStorage.getItem(this.userString);
    if (
      Boolean(
        token === 'undefined' ||
          u === 'undefined' ||
          u === null ||
          token === null
      )
    ) {
      return false;
    } else {
      if (u) {
        let data = JSON.parse(u);
        GLOBAL.currentUser = Boolean(!GLOBAL.currentUser)
          ? UserFactory.createUser(data)
          : GLOBAL.currentUser;
      }
    }
    let user = GLOBAL.currentUser;
    let res = Boolean(
      Boolean(token && token.length > 0) &&
        Boolean(user !== undefined) &&
        !AuthGuard.jwtHelperService?.isTokenExpired(token ?? '')
    );
    return res;
  }

  public static logout() {
    localStorage.removeItem(this.tokenSrting);
    localStorage.removeItem(this.userString);
    localStorage.removeItem('rememberMe');
    GLOBAL.currentUser = undefined;
  }

  public static login(user: User) {
    GLOBAL.currentUser = user;
    user.password = '************';
    let token = user.token ?? '';
    localStorage.setItem(this.tokenSrting, token);
    localStorage.setItem(this.userString, JSON.stringify(GLOBAL.currentUser));
  }


  public static getToken(): string | null {
    return localStorage.getItem(this.tokenSrting);
  }
  public static getLogedInUser() {
    let token = AuthGuard.getToken() ?? null;
    return AuthGuard.jwtHelperService?.decodeToken(token);
  }

  public static decodeToken() {
    const token = this.getToken();
    return token ? jwtHelper.decodeToken(token) : null;
}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (AuthGuard.isLoggedIn()) {
      if (null === GLOBAL.currentUser || GLOBAL.currentUser === undefined) {
        // logged in but opened a new tab
        this.router.navigate(['/auth/login']);
      }
      // else if ( GLOBAL.currentUser instanceof User) {
      //     let res = this.rolePermission.isRestrictedRouteForCurrentUser(state.url);
      //     return !res;
      // }
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/auth/login']);
    return false;
  }

}
