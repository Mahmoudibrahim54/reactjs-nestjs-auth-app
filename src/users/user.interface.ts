import { Document } from 'mongoose';
export interface IUser extends Document {
  readonly first_name: string;
  readonly last_name: string;
  readonly username: string;
  readonly email: string;
  readonly address: string;
  readonly password: string;
  readonly approve_terms: boolean;
}
export interface IUserResponse extends Document {
  readonly first_name: string;
  readonly last_name: string;
  readonly username: string;
  readonly email: string;
  readonly address: string;
  // readonly password: string;
  readonly approve_terms: boolean;
}
