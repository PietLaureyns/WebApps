import { TestBed, inject } from '@angular/core/testing';

import { SongDataService } from './song-data.service';

describe('SongDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SongDataService]
    });
  });

  it('should be created', inject([SongDataService], (service: SongDataService) => {
    expect(service).toBeTruthy();
  }));
});
