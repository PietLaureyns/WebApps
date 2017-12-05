import { PlaylistDataService } from './playlist-data.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Playlist} from '../models/playlist.model';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class PlaylistResolver implements Resolve< Playlist > {
    constructor(private recipeService: PlaylistDataService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Playlist> {
        return this.recipeService.getPlaylist(route.params['playlistId']);
    }
}
