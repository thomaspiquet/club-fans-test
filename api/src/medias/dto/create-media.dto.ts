import { IsNumber, IsPositive, IsString, Length } from 'class-validator';

export class CreateMediaDto {
  @IsString()
  @Length(3, 64)
  title: string;

  @IsString()
  @Length(0, 1024)
  description: string;

  @IsString()
  @Length(0, 256)
  URL: string;

  @IsNumber()
  @IsPositive()
  userId: number;
}
