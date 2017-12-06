import { Song } from './song.model';

export class Playlist {

  private _id: string;

  constructor(
    private _name: string,
    //private _songIds: String[],
    private _songs: Song[],
    private _isPublic: boolean,
    private _beschrijving: string//false = private playlist  |   true = public playlist
  ) {
 
  }

  static fromJSON(json): Playlist {
    let songs2: Song[] = [];
    json.songs.forEach( song => {
        songs2.push(Song.fromJSON(song));
      }
    );
    const rec = new Playlist(json.name, songs2, json.isPublic, json.beschrijving);
    rec._id = json._id;
    return rec;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  //get songIds() {
  //  return this._songIds;
  //}
  get songs() {
    return this._songs;
  }
  get isPublic() {
    return this._isPublic;
  }

  get beschrijving() {
    return this._beschrijving;
  }

  addSong(song: Song) {
    this._songs.push(song);
  }

  hasSong(song: Song): boolean {
    return this._songs.find(s => s.id === song.id) !== undefined;
  }

  getVisiblity(): string {
    if (this._isPublic)
      return "Public";
    else
      return "Private";
  }

  public toJSON() {
    return {
      name: this.name,
      songIds: this.songs,
      isPublic: this.isPublic,
      beschrijving: this.beschrijving,
      _id: this.id
    }
  }
}
