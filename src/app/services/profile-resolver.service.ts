import { PlaylistDataService } from './playlist-data.service';
import { UserDataService } from './user-data.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ProfileResolver implements Resolve< User > {
    constructor(private userService: UserDataService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
        return this.userService.getUserWithName(route.params['userId']);
      //return this.userService.ingelogdeGebruiker.playlists.find(p => p.name === route.params['playlistName']);
    }
}
