import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthenticationService } from './authentication.service';
import { UserDataService } from './user-data.service';
import { Playlist } from '../models/playlist.model';
import { Song } from '../models/song.model';
import 'rxjs/add/operator/map';

@Injectable()
export class PlaylistDataService {

  private userId: string;

  constructor(private http: Http, private auth: AuthenticationService, private userService: UserDataService) {
    this.auth.user$.subscribe(id => this.userId = id);
  }

  get playlists(): Observable<Playlist[]> {
    return this.http.get("/API/playlists", { headers: new Headers({ Authorization: `Bearer ${this.auth.token}` }) })
      .map(response => response.json().map(item => Playlist.fromJSON(item)));
  }

  getPlaylistWithId(playlistId): Observable<Playlist> {
    return this.http.get(`/API/playlist/${playlistId}`, { headers: new Headers({ Authorization: `Bearer ${this.auth.token}` }) })
      .map(res => res.json()).map(item => Playlist.fromJSON(item));
  }

  addNewPlaylist(playlist: Playlist) {
    return this.http.post(`/API/${this.userId}/playlist/`, playlist)
      .map(res => res.json()).map(item => Playlist.fromJSON(item));
  }

  addSongToPlaylist(song: Song, playlist: Playlist): Observable<Song> {
    return this.http.post(`/API/${this.userId}/playlist/${playlist.id}/song`, song)
      .map(res => res.json()).map(item => Song.fromJSON(item));
  }

  removeSongFromPlaylist(song: Song, playlist: Playlist) {
    return this.http.post(`/API/${this.userId}/playlist/${playlist.id}/deleteSong`, song)
      .map(res => res.json()).map(item => Song.fromJSON(item));
  }

  removePlaylist(playlist) {
    return this.http.delete(`API/${this.userId}/playlist/${playlist.id}`).map(res => res.json()).map(item => Playlist.fromJSON(item));
  }
}
