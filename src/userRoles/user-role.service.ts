import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from './user-role.entity';

@Injectable()
export class UserRoleService {
  constructor(private prisma: PrismaService) {}

  async createRole(name: string): Promise<UserRole> {
    return this.prisma.userRole.create({
      data: { name }
    });
  }

  async getRoles(): Promise<UserRole[]> {
    return this.prisma.userRole.findMany();
  }
}