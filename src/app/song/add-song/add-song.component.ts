import { Component, OnInit } from '@angular/core';
import { Song } from '../song.model';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { SongDataService } from '../song-data.service';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.css']
})
export class AddSongComponent implements OnInit {

  private song: FormGroup;
  public readonly genres: [
    "Rock",
    "Pop",
    "Pop Rock",
    "Rap",
    "Hip Hop",
    "Metal",
    "Jazz",
    "Country",
    "Classical",
    "Alternative",
    "Electronic",
    "Techno",
    "No Genre"
  ];

  constructor(private fb: FormBuilder, private songService: SongDataService) { }

  ngOnInit() {
    this.song = this.fb.group({
      name: ["", [Validators.required]],
      artist: ["", [Validators.required]],
      genre: ["No Genre"],
      year: [2000, [Validators.max(new Date().getFullYear())]],
      link: [""]
    });

    console.log(new Date().getFullYear());
  }

  onSubmit() {
    console.log("submit");

  }
}
