import {
  IsString,
  MaxLength,
  IsNotEmpty,
  IsEmail,
  Matches,
  MinLength,
} from 'class-validator';
export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @IsNotEmpty()
  readonly first_name: string;

  @IsString()
  @MaxLength(30)
  @MinLength(3)
  @IsNotEmpty()
  readonly last_name: string;

  @IsString()
  @MaxLength(30)
  @MinLength(7)
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
  @MaxLength(30)
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  readonly password: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly confirm_password: string;
}
