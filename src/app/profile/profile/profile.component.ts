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

  constructor(private playlistService: PlaylistDataService, private songService: SongDataService) { }

  ngOnInit() {
    //let song1 = new Song("testSong", "testArtist", "Rock", 2000, "www.google.com");
    //let testSongs: Song[] = [];
    //testSongs.push(song1);
    //let playlist1 = new Playlist("My playlist3", testSongs, true, "beschrijving!!!!!!!!!!!");
    //console.log(playlist1);
    //this.playlistService.addNewPlaylist(playlist1).subscribe();
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
    this.addingNewPlaylist = false;
  }

  cancelAddingNewPlaylist(bool) {
    this.addingNewPlaylist = !bool;
  }
}
