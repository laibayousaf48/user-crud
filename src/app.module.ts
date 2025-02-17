import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { VerificationModule } from './verification/verification.module';
import { UserRoleModule } from './userRoles/user-role.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    VerificationModule,
    UserRoleModule,
    AuthModule,
  ],
})
export class AppModule {}
