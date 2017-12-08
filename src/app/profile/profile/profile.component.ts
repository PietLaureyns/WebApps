import { Component, OnInit } from '@angular/core';
import { PlaylistDataService } from '../../services/playlist-data.service';
import { SongDataService } from '../../services/song-data.service';
import { UserDataService } from '../../services/user-data.service';
import { Playlist } from "../../models/playlist.model";
import { User } from "../../models/user.model";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  playlists: Playlist[] = [];
  addingNewPlaylist: boolean = false;
  alertAddedMessage;
  alertRemovedMessage;
  user: User;
  isYourProfile: boolean = true;
  temporaryActions: string[] = [".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."];

  constructor(private playlistService: PlaylistDataService, private songService: SongDataService,
    private userService: UserDataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(item => {
      if (item['user']) {
        this.user = item['user'];
        item['user'].playlists.forEach(p => this.playlistService.getPlaylistWithId(p).subscribe(val => this.playlists.push(val)));
        this.isYourProfile = false;
      } else {
        this.userService.ingelogdeGebruiker.subscribe(item => {
          this.user = item;
          item.playlists.forEach(p => {
            this.playlistService.getPlaylistWithId(p).subscribe(val => this.playlists.push(val));
          });
        });
      }
    });
  }

  addNewPlaylistClick() {
    this.addingNewPlaylist = true;
  }

  addNewPlaylist(playlist: Playlist) {
    this.playlistService.addNewPlaylist(playlist).subscribe(item => this.playlists.push(item));
    this.alertAddedMessage = "Created " + playlist.name;
    setTimeout(() => this.alertAddedMessage = null, 5000);
    this.addingNewPlaylist = false;
  }

  cancelAddingNewPlaylist(bool) {
    this.addingNewPlaylist = !bool;
  }
}
