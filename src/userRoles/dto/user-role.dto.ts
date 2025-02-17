import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRoleDto {
  @ApiProperty({ description: 'The name of the user role', example: 'Admin' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
