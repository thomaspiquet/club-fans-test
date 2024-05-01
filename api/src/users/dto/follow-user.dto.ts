import { IsNumber, IsPositive } from 'class-validator';

export class FollowUserDto {
  @IsNumber()
  @IsPositive()
  selfId: number;

  @IsNumber()
  @IsPositive()
  userToFollowId: number;
}
