import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 64)
  username: string;

  @IsString()
  @Length(3, 64)
  @IsEmail()
  email: string;

  @IsString()
  @Length(0, 1024)
  description: string;

  @IsString()
  @Length(0, 256)
  profilePictureURL: string;
}
