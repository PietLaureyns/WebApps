import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Playlist } from '../../models/playlist.model';

@Component({
  selector: 'app-add-playlist',
  templateUrl: './add-playlist.component.html',
  styleUrls: ['./add-playlist.component.css']
})
export class AddPlaylistComponent implements OnInit {

  @Output() newPlaylist = new EventEmitter<Playlist>();
  @Output() cancelNewPlaylist = new EventEmitter<boolean>();

  public playlist: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.playlist = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      isPublic: [true],
      description: [""]
    });
  }

  onSubmit() {
    const playlist = new Playlist(
      this.playlist.value.name,
      [],
      this.playlist.value.isPublic,
      this.playlist.value.description
    );

    this.newPlaylist.emit(playlist);
  }

  cancel() {
    this.cancelNewPlaylist.emit(true);
  }

}
