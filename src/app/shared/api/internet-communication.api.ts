import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InternalCommunicationService {
  private error = new BehaviorSubject(false);
  currentError = this.error.asObservable();

  setError(error: any) {
    this.error.next(error);
  }
}
