export interface Note {
  noteId: string;
  title: string;
  description: string;
  createTimestamp: Date;
  lastUpdateTimestamp: Date;
  expirationTimestamp: Date;
}
