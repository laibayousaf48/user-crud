import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/auth.guards';

@ApiTags('Users') 
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // @UseGuards(JwtAuthGuard)
  // @ApiOperation({ summary: 'Create a new user' }) 
  // @ApiBody({ type: CreateUserDto }) 
  // @ApiResponse({ status: 201, description: 'User successfully created' }) 
  // @ApiResponse({ status: 400, description: 'Bad request' }) 
  // async createUser(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.createUser(createUserDto);
  // }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retrieve all users' }) 
  @ApiResponse({ status: 200, description: 'List of users returned successfully' }) // Success response
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a user by ID' }) 
  @ApiParam({ name: 'id', type: Number, description: 'User ID' }) 
  @ApiResponse({ status: 200, description: 'User data retrieved successfully' }) 
  @ApiResponse({ status: 404, description: 'User not found' }) 
  async getUser(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a user by ID' }) 
  @ApiParam({ name: 'id', type: Number, description: 'User ID' }) 
  @ApiResponse({ status: 200, description: 'User successfully deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }
}
