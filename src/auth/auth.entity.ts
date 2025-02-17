import { ApiProperty } from '@nestjs/swagger';

// Interface for type checking
export interface Auth {
  id: number;
  userId: number;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Class for Swagger documentation
export class AuthModel implements Auth {
  @ApiProperty({ description: 'Auth ID' })
  id: number;

  @ApiProperty({ description: 'Associated User ID' })
  userId: number;

  @ApiProperty({ description: 'JWT Token' })
  token: string;

  @ApiProperty({ description: 'Token expiration date' })
  expiresAt: Date;

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt: Date;
}
