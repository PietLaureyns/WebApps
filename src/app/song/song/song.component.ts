import { Component, OnInit } from '@angular/core';
import { SongDataService } from '../song-data.service';
import { Song } from '../song.model';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {

  songs: Song[];

  constructor(private songService : SongDataService) { }

  ngOnInit() {
    //this.songService.initializeData();
    console.log(this.songs);

    //let song1 = new Song("Down Under", "Men at Work", "Pop Rock", 1981, "https://www.youtube.com/watch?v=XfR9iY5y94s");
    //this.songService.addNewSong(song1).subscribe();


    this.songService.songs.subscribe(s => this.songs = s);
    console.log(this.songs);
  }

}
