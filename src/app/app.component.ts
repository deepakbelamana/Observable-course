import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserServiceService } from './user/user-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  userActive : boolean
  userActiveSubject: Subscription;
  constructor(private userService : UserServiceService) {}
  ngOnDestroy(): void {
    this.userActiveSubject.unsubscribe()
  }

  ngOnInit() {
    this.userActiveSubject = this.userService.userActivate.subscribe( activated => {
      this.userActive=activated
    })
  }


}
