import { Component, OnInit} from '@angular/core';
import { PlaylistDataService } from '../../services/playlist-data.service';
import { UserDataService } from '../../services/user-data.service';
import { ActivatedRoute } from '@angular/router';
import { Playlist } from "../../models/playlist.model";
import { Song } from "../../models/song.model";

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  selectedPlaylist: Playlist;
  songs: Song[] = [];
  isYourPlaylist: boolean = true;

  constructor(private route: ActivatedRoute, private playlistService: PlaylistDataService,
    private userService: UserDataService) { }

  ngOnInit() {
    this.route.data.subscribe(item => {
      this.selectedPlaylist = item['playlist'];
      this.songs = this.selectedPlaylist.songs;
      this.userService.ingelogdeGebruiker.subscribe(g => {
        if (!g.playlists.includes(this.selectedPlaylist.id))
          this.isYourPlaylist = false;
      });
    });
  }

  removePlaylist() {
    this.playlistService.removePlaylist(this.selectedPlaylist).subscribe();
  }

  removeSong(song) {
    this.playlistService.removeSongFromPlaylist(song, this.selectedPlaylist)
      .subscribe(item => this.selectedPlaylist.songs.splice(this.selectedPlaylist.songs.indexOf(item), 1));
  }
}
