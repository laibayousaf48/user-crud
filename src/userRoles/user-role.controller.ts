import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { UserRole } from './user-role.entity';

@Controller('roles')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Post()
  async createRole(@Body() body: { name: string }): Promise<UserRole> {
    return this.userRoleService.createRole(body.name);
  }

  @Get()
  async getRoles(): Promise<UserRole[]> {
    return this.userRoleService.getRoles();
  }
}