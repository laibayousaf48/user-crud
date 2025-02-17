// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
// import { User } from '../users/user.entity';
// import { ApiProperty } from '@nestjs/swagger';

// @Entity()
// export class Verification {
//   @PrimaryGeneratedColumn()
//   @ApiProperty({ description: 'The unique identifier of the verification record' })
//   id: number;

//   @ManyToOne(() => User)
//   @JoinColumn({ name: 'userId' })
//   @ApiProperty({ description: 'The user associated with this verification', type: () => User })
//   user: User;

//   @Column()
//   @ApiProperty({ description: 'Verification token for authentication', example: 'abc123xyz' })
//   token: string;

//   @Column()
//   @ApiProperty({ description: 'Timestamp when the verification was created', example: '2025-02-17T12:00:00Z' })
//   createdAt: Date;

//   @Column()
//   @ApiProperty({ description: 'Timestamp when the verification expires', example: '2025-02-18T12:00:00Z' })
//   expiresAt: Date;
// }
