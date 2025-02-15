import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from './user-role.entity';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
  ) {}

  createRole(name: string): Promise<UserRole> {
    const role = new UserRole();
    role.name = name;
    return this.userRoleRepository.save(role);
  }

  getRoles(): Promise<UserRole[]> {
    return this.userRoleRepository.find();
  }
}