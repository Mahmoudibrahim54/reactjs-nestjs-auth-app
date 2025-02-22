import { Document } from 'mongoose';
export interface IUser extends Document {
  readonly first_name: string;
  readonly last_name: string;
  readonly username: string;
  readonly email: string;
  readonly address: string;
  readonly password: string;
}
