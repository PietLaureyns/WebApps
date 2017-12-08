import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Song } from '../../models/song.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SongDataService } from '../../services/song-data.service';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.css']
})
export class AddSongComponent implements OnInit {

  @Output() newSong = new EventEmitter<Song>();
  @Output() cancelNewSong = new EventEmitter<boolean>();

  public song: FormGroup;
  public readonly _genres: string[] = ["Rock","Pop","Pop Rock","Rap","Hip Hop","Metal",
    "Jazz","Country","Classical","Alternative", "Electronic", "Techno", "No Genre"
  ];

  constructor(private fb: FormBuilder, private songService: SongDataService) { }

  ngOnInit() {
    this.song = this.fb.group({
      name: ["", [Validators.required]],
      artist: ["", [Validators.required]],
      genre: ["No Genre"],
      year: [2000, [Validators.required, Validators.max(new Date().getFullYear()), Validators.pattern("[0-9]{4}")]],
      link: ["", [Validators.pattern('^(http|https)://.*$')]]
    });
  }

  get genres(){
    return this._genres;
  }

  onSubmit() {
    const song = new Song(
      this.song.value.name,
      this.song.value.artist,
      this.song.value.genre,
      this.song.value.year,
      this.song.value.link
    );

    this.newSong.emit(song);
  }

  cancel(){
    this.cancelNewSong.emit(false);
  }
}
