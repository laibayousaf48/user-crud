import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config/database.config';
import { UsersModule } from './users/users.module';
import { UserRoleModule } from './userRoles/user-role.module';
import { VerificationModule } from './verification/verification.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    UsersModule,
    UserRoleModule,
    VerificationModule,
  ],
})
export class AppModule {}
