import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { VerificationService } from './verification.service';
import { VerificationController } from './verification.controller';
import { Verification } from './verification.entity';
import { UsersModule } from '../users/users.module';
import { User } from '../users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Verification, User]),
    ConfigModule,
    UsersModule
  ],
  providers: [VerificationService],
  controllers: [VerificationController],
  exports: [VerificationService]
})
export class VerificationModule {}
