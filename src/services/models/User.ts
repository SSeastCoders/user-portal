export interface Address {
  streetAddress?: string;
  city?: string;
  zip?: number;
  state?: string;
}

export class User {
  id?: Number;
  role?: { id: Number; title: string };
  firstName?: string;
  lastName?: string;
  dob: Date;
  email?: string;
  phone?: string;
  address?: Address
  dateJoined: Date;
  activeStatus?: boolean;
  username?: string;
  constructor(instanceData: User) {
    this.dateJoined = new Date();
    this.dob = new Date();
    if (instanceData) {
      this.deserialize(instanceData);
    }
  }

  private deserialize(instanceData: User) {
    // Note this.active will not be listed in keys since it's declared, but not defined
    instanceData.dateJoined = new Date(instanceData.dateJoined);
    instanceData.dob = new Date(instanceData.dob);
    Object.assign(this, instanceData);
  }
  public addressToString() {
    return this.address?.streetAddress + ", " + this.address?.state + " " + this.address?.zip
  }
}
