import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Song } from '../models/song.model'
import { Observable } from 'rxjs/Rx';
import { AuthenticationService } from "./authentication.service";
import 'rxjs/add/operator/map';

@Injectable()
export class SongDataService {

  constructor(private http: Http, private auth: AuthenticationService) { }

  get songs(): Observable<Song[]> {
    return this.http.get("/API/songs", { headers: new Headers({ Authorization: `Bearer ${this.auth.token}` }) })
      .map(response => response.json().map(item => Song.fromJSON(item)));
  }

  addNewSong(song:Song): Observable<Song> {
    return this.http.post("/API/songs", song)
    .map(res => res.json()).map(item => Song.fromJSON(item));
  }

  removeSong(song) {
    return this.http.delete(`/API/songs/${song.id}`);
  }
}
