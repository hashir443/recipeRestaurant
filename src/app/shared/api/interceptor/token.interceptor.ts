import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError } from 'rxjs';
import {AuthGuard } from '../../guards/auth.guard';
import { Router } from '@angular/router';
import { JwtService } from '../../services/jwt.servcie';
import { InternalCommunicationService } from '../internet-communication.api';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private router: Router, private JwtService: JwtService, private internalCommunication: InternalCommunicationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (AuthGuard.isLoggedIn()) {
            if (req.headers.get("skip"))  // don't add token with specific calls
                return next.handle(req);
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${AuthGuard.getToken()}`
                }
            })
        }
        return next.handle(req);
    }
 }
