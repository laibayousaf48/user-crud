import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/auth.guards';
import {AuthDto, AuthRegisterDto} from './dto/auth.dto'
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { BadRequestException, NotFoundException } from '@nestjs/common';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register user' })
  @ApiBody({ type: AuthRegisterDto })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad request, email already in use or other validation errors' })
  async register(@Body() body: { email: string; password: string }) {
    try {
      return await this.authService.register(body.email, body.password);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: AuthDto })
  @ApiResponse({ status: 200, description: 'User logged in successfully', })
  @ApiResponse({ status: 400, description: 'Bad request, invalid credentials' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async login(@Body() body: { email: string; password: string }) {
    try {
      const user = await this.authService.validateUser(body.email, body.password);
      return await this.authService.login(user);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  // @Post('profile')
  // @UseGuards(JwtAuthGuard)
  // async getProfile(@Request() req) {
  //   return req.user;
  // }
}
