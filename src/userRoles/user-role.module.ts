import { Module } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { UserRoleController } from './user-role.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserRoleService],
  controllers: [UserRoleController],
  exports: [UserRoleService]
})
export class UserRoleModule {}
