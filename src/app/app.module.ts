import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileModule } from './profile/profile.module';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserModule } from './user/user.module';

import { SongDataService } from './services/song-data.service';
import { PlaylistDataService } from './services/playlist-data.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SongComponent } from './song/song/song.component';
import { AddSongComponent } from './song/add-song/add-song.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './services/auth-guard.service';
import { PeopleComponent } from './people/people.component';

const appRoutes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: 'songs', canActivate: [AuthGuardService], component: SongComponent },
  { path: 'add-song', canActivate: [AuthGuardService], component: AddSongComponent },
  { path: 'people', canActivate: [AuthGuardService], component: PeopleComponent },
  { path: '', redirectTo: 'homepage', pathMatch: "full" },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    SongComponent,
    PageNotFoundComponent,
    AddSongComponent,
    PeopleComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    MatMenuModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    NgbModalModule,
    ProfileModule,
    UserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    SongDataService,
    PlaylistDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
