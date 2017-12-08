export class Action {

  private _id: string;

  constructor(
    private _date: string,
    private _userName: string,
    private _type: string,     //new playlist, add song to playlist, add friend, make account
    private _playlistId?: string,
    private _songName?: string,
    private _userId?: string
  ) { }

  static fromJSON(json): Action {
    const rec = new Action(json.date, json.userName, json.type, json.playlistId, json.songName, json.userId);
    rec._id = json._id;
    return rec;
  }

  get dateString() {
    return this._date.toLocaleString();
  }

  get date() {
    return this._date;
  }

  get userName() {
    return this._userName;
  }

  get songName() {
    return this._songName;
  }

  get id() {
    return this._id;
  }

  get message() {
    switch (this._type) {
      case "newPlaylist": return (this._userName + " has added a new playlist, check it out here: "/*link to playlist*/);
      case "newFriend": return (this._userName + " just became friends with "/*Link to other user*/);
      case "addSongtoPlaylist": return (this._userName + " just added " + this._songName + " to his playlist "/*Link to playlist*/);
      case "createAccount": return (this._userName + " just created his account. Welcome to the site!");
    }
  }

  public toJSON() {
    return {
      date: this._date,
      userName: this._userName,
      type: this._type,
      playlistId: this._playlistId,
      songName: this._songName,
      userId: this._userId,
      _id: this.id
    }
  }

}
