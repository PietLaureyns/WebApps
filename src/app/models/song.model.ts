export class Song {

  private _id: string;

  constructor(
    private _name: string,
    private _artist: string,
    private _genre: string,
    private _year: number,
    private _link: string
  ) { }

  static fromJSON(json): Song {
    const rec = new Song(json.name, json.artist, json.genre, json.year, json.link);
    rec._id = json._id;
    return rec;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get link() {
    return this._link;
  }

  get artist() {
    return this._artist;
  }

  get genre() {
    return this._genre;
  }

  get year() {
    return this._year;
  }

  toString() {
    return ""+this._artist + " - " + this._name;
  }

  hasLink(){
    return this._link.length > 0;
  }

  public toJSON() {
    return {
      name: this.name,
      artist: this.artist,
      genre: this.genre,
      year: this.year,
      link: this.link,
      _id: this.id
    }
  }
}
