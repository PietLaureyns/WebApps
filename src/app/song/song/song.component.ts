import { Component, OnInit } from '@angular/core';
import { SongDataService } from '../../services/song-data.service';
import { PlaylistDataService } from '../../services/playlist-data.service';
import { Song } from '../../models/song.model';
import { Playlist } from '../../models/playlist.model';
import { debounceTime } from "rxjs/operator/debounceTime";

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {

  songs: Song[];
  addingNewSong: boolean = false;
  selectedSong: Song;
  playlists: Playlist[];
  alertSuccessMessage: string;
  alertWarningMessage: string;

  constructor(private songService: SongDataService, private playlistService: PlaylistDataService) { }

  ngOnInit() {
    //this.songService.initializeData();

    //let song1 = new Song("Down Under", "Men at Work", "Pop Rock", 1981, "https://www.youtube.com/watch?v=XfR9iY5y94s");
    //this.songService.addNewSong(song1).subscribe();
    this.playlistService.playlists.subscribe(p => this.playlists = p);
    this.songService.songs.subscribe(s => this.songs = s);
  }

  songClicked(songId) {
    this.selectedSong = this.songs.filter(song => song.id === songId)[0];
    //console.log(songId);
  }

  addSongToPlaylist(song, playlist) {
    if (playlist.songs.filter(s => s.id === song.id).length > 0) {
      console.log("already has song");
      this.alertWarningMessage = "'" + song.toString() + "' is already in '" + playlist.name + "'";
      setTimeout(() => this.alertWarningMessage = null, 5000);
    } else {
      console.log("Added");
      this.playlistService.addSongToPlaylist(song, playlist).subscribe();
      this.playlists.find(p => p.id === playlist.id).addSong(song);
      this.alertSuccessMessage = "'" + song.toString() + "' has been added to your playlist '" + playlist.name + "'";
      setTimeout(() => this.alertSuccessMessage = null, 5000);
    }
    console.log(song);
    console.log(playlist);
    //let song1 = this.songs.find(s => s.id == songId);
    //this.playlistService.addSongToPlaylist()
  }

  addNewSong(song) {
    console.log("addNewSong(): " + song);
    this.songService.addNewSong(song).subscribe(item => this.songs.push(item));
    this.songService.songs.subscribe(item => this.songs = item);
    this.songs.push(song);
    this.addingNewSong = false;
    this.alertSuccessMessage = "'" + song.toString() + "' has been added!";
    setTimeout(() => this.alertSuccessMessage = null, 5000);
  }

  addNewSongButtonClicked() {
    this.addingNewSong = true;
  }

  cancelNewSong(cancel) {
    this.addingNewSong = cancel;
  }


  //ALs ge direct na toevoegen de nieuwe song probeert te verwijderen 
  //stuurt ge een unidentified id naar de backend, 
  //na een refresh werkt de delete wel zoals het hoort
  removeSong(song) {
    console.log(song);
    this.songService.removeSong(song).subscribe();
    this.songs = this.songs.filter(s => s.id !== song.id);
    //this.songService.removeSong(song).subscribe(item =>
    //  this.songs = this.songs.filter(val => item.id !== val.id));
  }

}
