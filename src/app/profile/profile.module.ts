import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AddPlaylistComponent } from './add-playlist/add-playlist.component';
import { PlaylistResolver } from '../services/playlist-resolver.service';


const appRoutes = [
  { path: 'profile/:userId', component: ProfileComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'playlist', component: PlaylistComponent },
  { path: 'playlist/:playlistId', component: PlaylistComponent, resolve: { playlist: PlaylistResolver }  },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'add-playlist', component: AddPlaylistComponent }
];

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(appRoutes)
  ],
  declarations: [
    ProfileComponent,
    PlaylistComponent,
    EditProfileComponent,
    AddPlaylistComponent
  ],
  providers: [
    PlaylistResolver
  ],
})
export class ProfileModule { }
