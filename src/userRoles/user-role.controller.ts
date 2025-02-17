import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserRoleDto } from './dto/user-role.dto';
import { UserRole, UserRoleModel } from './user-role.entity';

@ApiTags('Roles') // 👈 This makes it appear in Swagger UI
@Controller('roles')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user role' })
  @ApiResponse({ status: 201, description: 'Role created successfully', type: UserRoleModel })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createRole(@Body() body: CreateUserRoleDto): Promise<UserRole> {
    return this.userRoleService.createRole(body.name);
  }

  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({ status: 200, description: 'List of roles', type: [UserRoleModel] })
  async getRoles(): Promise<UserRole[]> {
    return this.userRoleService.getRoles();
  }
}
