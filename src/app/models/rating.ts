import { Timestamp } from "@angular/fire/firestore";

export class Rating {
  public id : string;
  public date: Date;
  public username: string;
  public rate: number;
  public title: string;
  public review: string;
  public approve: boolean;
  public created: Timestamp;
  public modified: Timestamp;
}
