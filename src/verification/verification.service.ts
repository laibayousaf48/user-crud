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
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Verification } from './verification.entity';
import * as nodemailer from 'nodemailer';
import * as crypto from 'crypto'; // To generate random tokens
import { ConfigService } from '@nestjs/config'; // To manage environment variables

@Injectable()
export class VerificationService {
  private transporter;

  constructor(
    @InjectRepository(Verification)
    private verificationRepository: Repository<Verification>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService, // To get email credentials from .env
  ) {
    // Initialize Nodemailer transporter
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // Or use another email provider like SendGrid, etc.
      auth: {
        // user: this.configService.get<string>('EMAIL_USER'), // Email address from .env
        // pass: this.configService.get<string>('EMAIL_PASSWORD'), // Email password from .env
        user: process.env.EMAIL_USER,// Email address from .env
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async createVerificationToken(userId: number): Promise<string> {
    // 1. Generate a random 4-digit token
    const token = this.generateRandomToken();

    // 2. Save token to database (with a timestamp to expire after a while)
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const verification = new Verification();
    verification.user = user;
    verification.token = token;
    verification.createdAt = new Date();
    verification.expiresAt = new Date(Date.now() + 60 * 60 * 1000); // Token expires in 1 hour

    await this.verificationRepository.save(verification);

    // 3. Send token to user's email
    await this.sendVerificationEmail(user.email, token);

    return token;
  }

  private generateRandomToken(): string {
    // Generates a random 4-digit number
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  private async sendVerificationEmail(to: string, token: string): Promise<void> {
    const mailOptions = {
      from: this.configService.get<string>('EMAIL_USER'), // Sender email address
      to, // Recipient email
      subject: 'Email Verification Code',
      text: `Your verification code is: ${token}`, // Simple text message
    };

    await this.transporter.sendMail(mailOptions);
  }

  async verifyToken(token: string, userId: number): Promise<boolean> {
    const verification = await this.verificationRepository.findOne({
      where: { user: { id: userId }, token },
    });

    if (!verification) {
      throw new Error('Invalid verification token');
    }

    if (new Date() > verification.expiresAt) {
      throw new Error('Verification token has expired');
    }

    // Mark the user as verified
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    user.isVerified = true;
    await this.userRepository.save(user);

    // Optionally delete the verification token (once it's used)
    await this.verificationRepository.delete(verification.id);

    return true;
  }
}