import { PlaylistDataService } from './playlist-data.service';
import { UserDataService } from './user-data.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Playlist} from '../models/playlist.model';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class PlaylistResolver implements Resolve< Playlist > {
    constructor(private playlistService: PlaylistDataService, private userService: UserDataService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Playlist> {
        return this.playlistService.getPlaylistWithId(route.params['playlistId']);
      //return this.userService.ingelogdeGebruiker.playlists.find(p => p.name === route.params['playlistName']);
    }
}
