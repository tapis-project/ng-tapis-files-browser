import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';
import {EMPTY, Subject} from 'rxjs';
import {catchError, switchAll, tap} from 'rxjs/operators';

interface INotification {
  tenantId: string;
  recipient: string;
  message: string;
  created: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private messagesSubject$ = new Subject<INotification>();
  public messages = this.messagesSubject$.asObservable();

  constructor() {
    const subject = webSocket<INotification>('ws://localhost:8081/notifications');
    subject.subscribe((m) => {
      this.messagesSubject$.next(m);
    });
  }

}
