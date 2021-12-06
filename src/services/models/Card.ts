import { Transform, Type } from "class-transformer";
import { DateTime } from "luxon";
import { User } from "./User";

export enum CardType {
  CREDIT,
  DEBIT
}

export class Card {
  id: number;
  @Type(() => User)
  users: User[];
  cvv: string;
  swipe: string;
  interestRate: number;
  creditLimit: number;
  availableCredit: number;
  minDue: number;
  @Type(() => String)
  @Transform(({ value }) => DateTime.fromISO(value))
  openDate: DateTime;
  @Type(() => String)
  @Transform(({ value }) => DateTime.fromISO(value))
  expDate: DateTime;
  @Type(() => String)
  @Transform(({ value }) => DateTime.fromISO(value))
  dueDate: DateTime;
  balance: number;
  activeStatus: boolean;
  nickName: string;
}