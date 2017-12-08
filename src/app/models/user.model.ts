import { Action } from './action.model';

export class User {

  private _id: string;

  constructor(
    private _username: string,
    private _firstname: string,
    private _lastname: string,
    private _description: string,
    private _friends: User[],
    private _playlists: string[], //playlistIds
    private _recentActions: Action[]
  ) { }

  static fromJSON(json): User {
    const rec = new User(json.username, json.firstname, json.lastname, json.description, json.friends, json.playlists, json._recentActions);
    rec._id = json._id;
    return rec;
  }

  get id() {
    return this._id;
  }

  get username() {
    return this._username;
  }

  get firstname() {
    return this._firstname;
  }

  get lastname() {
    return this._lastname;
  }

  get description() {
    return this._description;
  }

  get playlists() {
    return this._playlists;
  }

  get name() {
    return this._firstname + " " + this._lastname;
  }

  get friends() {
    return this._friends;
  }

    get recentActions() {
      return this._recentActions;
    }

  public toJSON() {
    return {
      username: this.username,
      firstname: this.name,
      lastname: this.lastname,
      description: this.description,
      friends: this.friends,
      playlists: this.playlists,
      recentActions: this.recentActions,
      _id: this.id
    }
  }
}
