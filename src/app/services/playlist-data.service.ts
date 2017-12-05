import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Playlist } from '../models/playlist.model';
import { Song } from '../models/song.model';

@Injectable()
export class PlaylistDataService {

  constructor(private http:Http) {
    
  }

  get playlists(): Observable<Playlist[]> {
    return this.http.get("/API/playlists")
      .map(response => response.json().map(item => Playlist.fromJSON(item)));
  }

  getPlaylist(id): Observable<Playlist> {
    return this.http.get(`/API/playlist/${id}`)
      .map(response => response.json()).map(item => Playlist.fromJSON(item));
  }

  addNewPlaylist(playlist: Playlist) {
    return this.http.post("/API/playlists", playlist)
      .map(res => res.json()).map(item => new Playlist(item.name, item.songs, item.isPublic, item.beschrijving));
  }

  addSongToPlaylist(song: Song, playlist: Playlist): Observable<Song> {
    return this.http.post(`/API/playlists/${playlist.id}/songs`, song)
      .map(res => res.json()).map(item => Song.fromJSON(item));
  }

  removeSongFromPlaylist(song: Song, playlist: Playlist) {
    return this.http.post(`/API/playlists/${playlist.id}/deleteSong`, song)
      .map(res => res.json()).map(item => Song.fromJSON(item));
  }

  removePlaylist(playlist) {
    return this.http.delete(`API/playlists/${playlist.id}`).map(res => res.json()).map(item => Playlist.fromJSON(item));
  }
}
