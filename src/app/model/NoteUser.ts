import {Note} from "./Note";

export class NoteUser {
  public id: string | undefined;
  public username: string;
  public password: string | undefined;
  public email: string | undefined;
  public isEnabled: boolean | undefined;
  public notes: Note[] | undefined;
  public createTimestamp: Date | undefined;
  public lastUpdateTimestamp: Date | undefined;
  public verificationToken: string | undefined;

  constructor(username: string, password: string, email: string) {
    this.username = username;
    this.password = password;
    this.email = email;
  }

  getId(): string {
    return `${this.id}`
  }

  getUsername(): string {
    return `${this.username}`
  }

  setPassword(password:string): void {
    this.password = password
  }


}
