// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Verification } from './verification.entity';

// @Injectable()
// export class VerificationService {
//   constructor(
//     @InjectRepository(Verification)
//     private verificationRepository: Repository<Verification>,
//   ) {}

//   createVerification(userId: number, token: string): Promise<Verification> {
//     const verification = new Verification();
//     verification.verificationToken = token;
//     verification.user = { id: userId } as any; // Linking the user to the verification
//     return this.verificationRepository.save(verification);
//   }

//   async verifyToken(token: string): Promise<Verification> {
//     const verification = await this.verificationRepository.findOne({ where: { verificationToken: token } });
//     if (!verification) {
//       throw new Error('Verification not found');
//     }
//     return verification;
//   }
// }

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class VerificationService {
  private transporter;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async createVerificationToken(userId: number): Promise<string> {
    const token = Math.floor(1000 + Math.random() * 9000).toString();
    
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    await this.prisma.verification.create({
      data: {
        userId,
        token,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
      },
    });

    await this.sendVerificationEmail(user.email, token);
    return token;
  }

  async verifyToken(token: string, userId: number): Promise<boolean> {
    const verification = await this.prisma.verification.findFirst({
      where: { userId, token },
    });

    if (!verification || new Date() > verification.expiresAt) {
      return false;
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { isVerified: true },
    });

    await this.prisma.verification.delete({ where: { id: verification.id } });
    return true;
  }

  private async sendVerificationEmail(to: string, token: string): Promise<void> {
    await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: 'Email Verification Code',
      text: `Your verification code is: ${token}`,
    });
  }
}