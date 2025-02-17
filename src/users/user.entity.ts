import { ApiProperty } from '@nestjs/swagger';

// Interface for type checking
export interface User {
  id: number;
  email: string;
  password: string;
  isVerified: boolean;
  roleId?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Class for Swagger documentation
export class UserModel implements User {
  @ApiProperty({ description: 'User ID' })
  id: number;

  @ApiProperty({ description: 'User email' })
  email: string;

  @ApiProperty({ description: 'Hashed password' })
  password: string;

  @ApiProperty({ description: 'Verification status' })
  isVerified: boolean;

  @ApiProperty({ description: 'Role ID', required: false })
  roleId?: number;

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt: Date;
}
