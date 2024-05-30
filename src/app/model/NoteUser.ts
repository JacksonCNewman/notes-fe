import {Note} from "./Note";

export interface NoteUser {
  id: string;
  username: string;
  password: string;
  email: string;
  isEnabled: boolean;
  notes: Note[];
  createTimestamp: Date;
  lastUpdateTimestamp: Date;
  verificationToken: string;
}
