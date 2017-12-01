import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SongComponent } from './song/song/song.component';
import { SongDataService } from './song/song-data.service';
import { AddSongComponent } from './song/add-song/add-song.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    SongComponent,
    AddSongComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [SongDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
