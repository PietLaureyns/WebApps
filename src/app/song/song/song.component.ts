import { Component, OnInit } from '@angular/core';
import { SongDataService } from '../../services/song-data.service';
import { PlaylistDataService } from '../../services/playlist-data.service';
import { Song } from '../../models/song.model';
import { Playlist } from '../../models/playlist.model';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from "rxjs/operator/debounceTime";

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {

  songs: Song[];
  filteredSongs: Song[] = [];
  addingNewSong: boolean = false;
  playlists: Playlist[];
  alertSuccessMessage: string;
  alertWarningMessage: string;
  searchString: string = "";
  remove: boolean = false;
  songToRemove: string;
  public readonly genres: string[] = ["No Genre Filter", "Rock", "Pop", "Pop Rock", "Rap", "Hip Hop", "Metal", "Jazz",
    "Country", "Classical", "Alternative", "Electronic", "Techno"];

  constructor(private songService: SongDataService, private playlistService: PlaylistDataService) { }

  ngOnInit() {
    this.playlistService.playlists.subscribe(p => this.playlists = p);
    this.songService.songs.subscribe(s => {
      this.songs = s;
      this.filteredSongs = s;
    });
  }

  public beforeChange($event: NgbPanelChangeEvent) {
    if (this.remove) {
      $event.preventDefault();
      this.removeSong(this.songToRemove);
      this.songToRemove = undefined;
      this.remove = false;
    }
  };

  addSongToPlaylist(song, playlist) {
    if (playlist.songs.filter(s => s.id === song.id).length > 0) {
      this.alertWarningMessage = "'" + song.toString() + "' is already in '" + playlist.name + "'";
      setTimeout(() => this.alertWarningMessage = null, 5000);
    } else {
      this.playlistService.addSongToPlaylist(song, playlist).subscribe();
      this.playlists.find(p => p.id === playlist.id).addSong(song);
      this.alertSuccessMessage = "'" + song.toString() + "' has been added to your playlist '" + playlist.name + "'";
      setTimeout(() => this.alertSuccessMessage = null, 5000);
    }
  }

  addNewSong(song) {
    this.songService.addNewSong(song).subscribe(item => {
      this.filteredSongs.push(item);
    });
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

  removeSongClick(song) {
    this.songToRemove = song;
    this.remove = true;
    this.alertWarningMessage = "Succesfully removed '" + song.toString()+"'";
    setTimeout(() => this.alertWarningMessage = null, 5000);
  }

  removeSong(song) {
    this.songService.removeSong(song).subscribe();
    this.songs = this.songs.filter(s => s.id !== song.id);
    this.filteredSongs = this.filteredSongs.filter(s => s.id !== song.id);

  }

  search(searchValue) {
    this.searchString = searchValue;
    if (searchValue.length < 1)
      this.filteredSongs = this.songs;
    else {
      this.filteredSongs = this.songs.filter(song => song.name.trim().toLowerCase().includes(searchValue.trim().toLowerCase()));
      this.filteredSongs = this.filteredSongs.concat(this.songs.filter(song => song.artist.trim().toLowerCase().includes(searchValue.trim().toLowerCase())));
    }
  }

  filter(genre, year, artistName, songname) {
    console.log(genre + " - " + year + " - " + artistName + " - " + songname);

    this.search(this.searchString);
    if(genre !== this.genres[0])
      this.filteredSongs = this.filteredSongs.filter(song => song.genre === genre);

    if (year !== "No Year filter")
      this.filterByYear(year);

    if (artistName) {
        this.filteredSongs.sort(function (a, b) {
          return a.artist.toLowerCase() == b.artist.toLowerCase() ? 0 : +(a.artist.toLowerCase() > b.artist.toLowerCase()) || -1;
        });
    }

    if (songname) {
      this.filteredSongs.sort(function (a, b) {
        return a.name.toLowerCase() == b.name.toLowerCase() ? 0 : +(a.name.toLowerCase() > b.name.toLowerCase()) || -1;
      });
    }

    //this.filteredSongs.sort(function (a, b) {
    //  return a.name > b.name;
    //});


  }

  filterByYear(year) {
    switch (year) {
      case "2017": this.filteredSongs = this.filteredSongs.filter(song => song.year === 2017); break;
      case "2016": this.filteredSongs = this.filteredSongs.filter(song => song.year === 2016); break;
      case "2010 - 2015": this.filteredSongs = this.filteredSongs.filter(song => song.year >= 2010 && song.year <= 2015); break;
      case "2000 - 2009": this.filteredSongs = this.filteredSongs.filter(song => song.year >= 2000 && song.year <= 2009); break;
      case "1990 - 1999": this.filteredSongs = this.filteredSongs.filter(song => song.year >= 1990 && song.year <= 1999); break;
      case "1980 - 1989": this.filteredSongs = this.filteredSongs.filter(song => song.year >= 1980 && song.year <= 1989); break;
      case "1970 - 1979": this.filteredSongs = this.filteredSongs.filter(song => song.year >= 1970 && song.year <= 1979); break;
      case "1960 - 1969": this.filteredSongs = this.filteredSongs.filter(song => song.year >= 1960 && song.year <= 1969); break;
      case "........ - 1959": this.filteredSongs = this.filteredSongs.filter(song => song.year <= 1959); break; 
    }
  }
}
