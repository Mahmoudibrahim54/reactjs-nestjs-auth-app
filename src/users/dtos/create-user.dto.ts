import { IsString, MaxLength, IsNotEmpty, IsEmail } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly first_name: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly last_name: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString()
  @MaxLength(200)
  @IsNotEmpty()
  readonly address: string;

  @IsString()
  @MaxLength(200)
  @IsNotEmpty()
  readonly password: string;
}
