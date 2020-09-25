import { Component, OnInit } from '@angular/core';
import { NotificationsService} from '../../services/notifications.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private notifications: NotificationsService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.notifications.messages.subscribe((m) => {
      this.toastr.success(m.message);
    });
  }

}
