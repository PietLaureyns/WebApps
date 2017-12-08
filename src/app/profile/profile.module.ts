import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuardService } from '../services/auth-guard.service';

import { ProfileComponent } from './profile/profile.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AddPlaylistComponent } from './add-playlist/add-playlist.component';
import { PlaylistResolver } from '../services/playlist-resolver.service';
import { ProfileResolver } from '../services/profile-resolver.service';

const appRoutes = [
  { path: 'profile/:userId', canActivate: [AuthGuardService], component: ProfileComponent, resolve: { user: ProfileResolver } },
  { path: 'profile', canActivate: [AuthGuardService], component: ProfileComponent },
  { path: 'playlist', canActivate: [AuthGuardService], component: PlaylistComponent },
  { path: 'playlist/:playlistId', canActivate: [AuthGuardService], component: PlaylistComponent, resolve: { playlist: PlaylistResolver }  },
  { path: 'edit-profile', canActivate: [AuthGuardService], component: EditProfileComponent },
  { path: 'add-playlist', canActivate: [AuthGuardService], component: AddPlaylistComponent }
];

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    NgbModalModule,
    NgbModule,
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
    PlaylistResolver,
    ProfileResolver
  ],
})
export class ProfileModule { }
