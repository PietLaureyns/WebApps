import { Component, OnInit } from '@angular/core';
import { PlaylistDataService } from '../../services/playlist-data.service';
import { SongDataService } from '../../services/song-data.service';
import { Playlist } from "../../models/playlist.model";
import { Song } from "../../models/song.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  playlists: Playlist[];
  songs: Song[];
  selectedPlaylist: Playlist;
  addingNewPlaylist: boolean = false;
  alertAddedMessage;
  alertRemovedMessage;

  constructor(private playlistService: PlaylistDataService, private songService: SongDataService) { }

  ngOnInit() {
    this.playlistService.playlists.subscribe(item => this.playlists = item);
  }

  selectPlaylist(playlistId) {
    this.selectedPlaylist = this.playlists.find(p => p.id === playlistId);
    console.log(playlistId + ": " + this.selectedPlaylist);
  }

  addNewPlaylistClick() {
    this.addingNewPlaylist = true;
    
  }

  addNewPlaylist(playlist) {
    this.playlistService.addNewPlaylist(playlist).subscribe(item => this.playlists.push(item));
    this.alertAddedMessage = "Created " + playlist.name;
    setTimeout(() => this.alertAddedMessage = null, 5000);
    this.addingNewPlaylist = false;
  }

  cancelAddingNewPlaylist(bool) {
    this.addingNewPlaylist = !bool;
  }
}
