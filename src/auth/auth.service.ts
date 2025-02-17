// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { PrismaService } from '../prisma/prisma.service';
// import * as bcrypt from 'bcrypt';

// @Injectable()
// export class AuthService {
//   constructor(private prisma: PrismaService, private jwtService: JwtService) {}

//   async validateUser(email: string, pass: string) {
//     const user = await this.prisma.user.findUnique({ where: { email } });
//     if (!user || !user.password) throw new UnauthorizedException();

//     const passwordValid = await bcrypt.compare(pass, user.password);
//     if (!passwordValid) throw new UnauthorizedException();

//     return user;
//   }

//   async login(user: { id: number; email: string }) {
//     const payload = { sub: user.id, email: user.email };
//     return { access_token: this.jwtService.sign(payload) };
//   }

//   async register(email: string, password: string) {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     return this.prisma.user.create({
//       data: { email, password: hashedPassword, provider: 'local' },
//     });
//   }
// }
////////////////////
import { Injectable, UnauthorizedException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string) {
    // Check if user exists
    const user = await this.prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials: User not found');
    }

    // Validate the password
    const passwordValid = await bcrypt.compare(pass, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials: Incorrect password');
    }

    return user;
  }

  async login(user: { id: number; email: string }) {
    const payload = { sub: user.id, email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(email: string, password: string) {
    try {
      // Check if the user already exists
      const existingUser = await this.prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new ConflictException('Email already in use');
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the new user
      return await this.prisma.user.create({
        data: { email, password: hashedPassword, provider: 'local' },
      });
    } catch (error) {
      // Catch Prisma errors (like unique constraint violations)
      if (error.code === 'P2002') { // Unique constraint violation (e.g., email already exists)
        throw new ConflictException('Email already in use');
      }
      // If the error is not a known Prisma error, throw an internal server error
      throw new InternalServerErrorException('An error occurred while registering the user');
    }
  }
}
