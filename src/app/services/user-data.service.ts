import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/Rx';
import { AuthenticationService } from "./authentication.service";
import 'rxjs/add/operator/map';

@Injectable()
export class UserDataService {

  private _userId;
  private _ingelogdeGebruiker: Observable<User>;

  constructor(private http: Http, private auth: AuthenticationService) {
    this.auth.user$.subscribe(id => this._userId = id);
    if (this._userId) {
      this._ingelogdeGebruiker = this.getUserWithName(this._userId);
    }
  }

  get users(): Observable<User[]> {
    return this.http.get("/API/users", { headers: new Headers({ Authorization: `Bearer ${this.auth.token}` }) })
      .map(response => response.json().map(item => User.fromJSON(item)));
  }

  getUserWithName(id): Observable<User> {
    return this.http.get(`/API/user/${id}`, id)
      .map(res => res.json()).map(item => User.fromJSON(item));
  }

  get username() {
    return this._userId;
  }

  get ingelogdeGebruiker(): Observable<User> {
    return this._ingelogdeGebruiker;
  }
}
