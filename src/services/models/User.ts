import { classToPlain, Expose, Transform, Type } from "class-transformer";
import { DateTime } from "luxon";
import "reflect-metadata";
import { states } from "../../utils/constants/states";

export interface Address {
  streetAddress?: string;
  city?: string;
  zip?: number;
  state?: string;
}

export class User {
  @Expose()
  id: number;
  @Expose()
  firstName: string;
  @Expose()
  lastName: string;
  @Expose()
  @Type(() => String)
  @Transform(({ value }) => DateTime.fromISO(value))
  dob: DateTime;
  @Expose()
  email: string;
  @Expose()
  phone: string;
  @Expose()
  address: Address;
  @Expose()
  @Type(() => String)
  @Transform(({ value }) => DateTime.fromISO(value))
  dateJoined: DateTime;
  @Expose()
  activeStatus: boolean;
  @Expose()
  username: string;

  public addressToString() {
    if (this.address) {
      return `${this.address.streetAddress}, ${
        states.find(({ value }) => value === this.address?.state)?.label
      } ${this.address?.zip}`;
    }
    return "";
  }

  public toDto() {
    const dto = classToPlain(this);
    dto.dob = this.dob?.toISO();
    dto.dateJoined = this.dateJoined?.toISO();
    return dto;
  }
}
