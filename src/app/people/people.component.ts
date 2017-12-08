import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  people;
  userId;

  constructor(private userService: UserDataService) { }

  ngOnInit() {
    this.userService.users.subscribe(users => this.people = users);
    this.userService.ingelogdeGebruiker.subscribe(item => {
      if (item != undefined)
        this.userId = item.id;
    });
  }
}
