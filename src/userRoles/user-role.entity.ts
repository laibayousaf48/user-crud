// import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
// import { ApiProperty } from '@nestjs/swagger';

// @Entity()
// export class UserRole {
//   @PrimaryGeneratedColumn()
//   @ApiProperty({ description: 'The unique identifier of the user role' })
//   id: number;

//   @Column()
//   @ApiProperty({ description: 'The name of the user role' })
//   name: string;
// }

import { ApiProperty } from '@nestjs/swagger';

export interface UserRole {
  id: number;
  name: string;
}

export class UserRoleModel implements UserRole {
  @ApiProperty({ description: 'Role ID' })
  id: number;

  @ApiProperty({ description: 'Role name' })
  name: string;
}
