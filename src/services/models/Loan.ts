import { Transform, Type } from "class-transformer";
import { DateTime } from "luxon";
import { User } from "./User";

export enum LoanType {
    AUTO,
    HOME,
    EDUCATION,
    BUSINESS
  }
  
  export class Loan {
    id: number;
    description: string;
    nickName: string;
    @Type(() => User)
    users: User[];
    type: LoanType;
    @Type(() => String)
    @Transform(({ value }) => DateTime.fromISO(value))
    openDate: DateTime;
    @Type(() => String)
    @Transform(({ value }) => DateTime.fromISO(value))
    dueDate: DateTime;
    loanTerm: number;
    amountLoaned: number;
    amountRemaining: number;
    amountDue: number;
    apr: number;
    goodStanding: boolean;
    active: boolean
  }
  