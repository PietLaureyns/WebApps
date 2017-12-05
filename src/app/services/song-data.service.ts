import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Song } from '../models/song.model'
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class SongDataService {

  private _url = "http://localhost:3000/api/";

  constructor(private http: Http) { }

  get songs(): Observable<Song[]> {
    return this.http.get("/API/songs")
      .map(response => response.json().map(item => Song.fromJSON(item)));
  }

  addNewSong(song:Song) {
    return this.http.post("/API/songs", song)
    .map(res => res.json()).map(item => new Song(item.name, item.artist, item.genre, item.year, item.link));
  }

  removeSong(rec) {
    console.log(rec.id);
    return this.http.delete(`/API/songs/${rec.id}`).map(res => res.json()).map(item => Song.fromJSON(item));
  }


  initializeData() {
    console.log("Data Initialize");
    //let songz: Song[];
    //this.songs.subscribe(s => songz = s);
    //console.log(songz);
    //if (songz.length <= 0) {

      let song1 = new Song("Down Under", "Men at Work", "Pop Rock", 1981, "https://www.youtube.com/watch?v=XfR9iY5y94s");
      let song2 = new Song("Alright", "Kendrick Lamar", "Rap", 2015, "https://www.youtube.com/watch?v=Z-48u_uWMHY");
      let song3 = new Song("Africa", "Toto", "Pop Rock", 1982, "https://www.youtube.com/watch?v=FTQbiNvZqaY");
      let song4 = new Song("Carry On Wayward Son", "Kansas", "Rock", 1976, "https://www.youtube.com/watch?v=2X_2IdybTV0");
      let song5 = new Song("Take Me On", "a-ha", "Pop", 1984, "https://www.youtube.com/watch?v=djV11Xbc914");

      this.addNewSong(song1).subscribe();
      this.addNewSong(song2).subscribe();
      this.addNewSong(song3).subscribe();
      this.addNewSong(song4).subscribe();
      this.addNewSong(song5).subscribe();
    //}
  }
}
