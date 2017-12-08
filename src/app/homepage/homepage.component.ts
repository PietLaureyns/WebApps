import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../services/user-data.service';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  isUserLoggedIn: boolean = true;
  user: User;

  constructor(private userService: UserDataService, private auth: AuthenticationService) { }

  ngOnInit() {
    this.auth.user$.subscribe(item => {
      if (item == null) {
        this.isUserLoggedIn = false;
      }
      else {
        this.userService.ingelogdeGebruiker.subscribe(item => this.user = item);
      }
    });
  }
}
