import { TestBed, inject } from '@angular/core/testing';

import { PlaylistDataService } from './playlist-data.service';

describe('PlaylistDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaylistDataService]
    });
  });

  it('should be created', inject([PlaylistDataService], (service: PlaylistDataService) => {
    expect(service).toBeTruthy();
  }));
});
