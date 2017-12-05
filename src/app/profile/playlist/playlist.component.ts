import { Component, OnInit, Input } from '@angular/core';
import { PlaylistDataService } from '../../services/playlist-data.service';
import { ActivatedRoute } from '@angular/router';
import { SongDataService } from '../../services/song-data.service';
import { Playlist } from "../../models/playlist.model";
import { Song } from "../../models/song.model";

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  //@Input() selectedPlaylist;
  selectedPlaylist: Playlist;
  playlists;
  yourPlaylist: boolean = false;
  songs;

  constructor(private route: ActivatedRoute, private playlistService: PlaylistDataService, private songService: SongDataService) { }

  ngOnInit() {
    this.route.data.subscribe(item => this.selectedPlaylist = item['playlist']);
    this.songService.songs.subscribe(item => this.songs = item);
    console.log(this.selectedPlaylist);
  }

  removePlaylist() {
    console.log("Delete playlist");
    this.playlistService.removePlaylist(this.selectedPlaylist).subscribe();
  }

  addSong() {
    console.log("Add song");
    let song1 = this.songs[0];
    this.playlistService.addSongToPlaylist(song1, this.selectedPlaylist)
      .subscribe(item => {
        console.log("Item: " + item);
        this.selectedPlaylist.addSong(item);
        console.log(this.selectedPlaylist);
      });
  }

  removeSong(song) {
    this.playlistService.removeSongFromPlaylist(song, this.selectedPlaylist)
      .subscribe(item => {
        console.log("Item: " + item);
        this.selectedPlaylist.songs.splice(this.selectedPlaylist.songs.indexOf(item), 1);
      });
  }
}
