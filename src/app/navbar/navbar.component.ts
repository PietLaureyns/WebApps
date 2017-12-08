import { Observable } from 'rxjs/Rx';
import { AuthenticationService } from '../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  get currentUser(): Observable<string> {
    return this.authService.user$;
  }

  ngOnInit() {
  }

}
