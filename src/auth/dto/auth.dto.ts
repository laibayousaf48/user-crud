import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
    minimum: 6
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class AuthRegisterDto {
    @ApiProperty({
      description: 'The name of the user',
      example: 'John Doe'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
      description: 'The email of the user', 
      example: 'user@example.com'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @ApiProperty({
      description: 'The password of the user',
      example: 'password123',
      minimum: 6
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @ApiProperty({
      description: 'Confirm password - must match password',
      example: 'password123',
      minimum: 6
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    confirmPassword: string;
}

export class AuthResponseDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  access_token: string;
}
