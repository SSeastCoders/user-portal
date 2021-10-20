import {Transform, Type} from 'class-transformer';
import {DateTime} from 'luxon';
import {User} from './User';

export enum AccountType {
  CHECKING,
  SAVING,
}

export class Account {
  id: number;
  accountType: AccountType;
  @Type(() => User)
  users: User[];
  interestRate: number;
  @Type(() => String)
  @Transform(({value}) => DateTime.fromISO(value))
  openDate: DateTime;
  balance: number;
  activeStatus: boolean;
  nickName: string;
}
