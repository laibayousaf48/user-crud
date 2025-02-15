// import { Controller, Post, Body } from '@nestjs/common';
// import { VerificationService } from './verification.service';

// @Controller('verification')
// export class VerificationController {
//   constructor(private readonly verificationService: VerificationService) {}

//   @Post('create')
//   async createVerification(@Body() body: { userId: number }): Promise<string> {
//     return this.verificationService.createVerificationToken(body.userId);
//   }

//   @Post('verify')
//   async verifyToken(@Body() body: { token: string, userId: number }): Promise<boolean> {
//     return this.verificationService.verifyToken(body.token, body.userId);
//   }
// }

import { Controller, Post, Body, Param } from '@nestjs/common';
import { VerificationService } from './verification.service';

@Controller('verification')
export class VerificationController {
  constructor(private verificationService: VerificationService) {}

  // Endpoint to create a new verification token and send it to the user's email
  @Post('create')
  async createVerificationToken(@Body() body: { userId: number }) {
    const { userId } = body;
    const token = await this.verificationService.createVerificationToken(userId);
    return { message: 'Verification code sent successfully', token };
  }

  // Endpoint to verify the token entered by the user
  @Post('verify/:userId')
  async verifyToken(
    @Param('userId') userId: number,
    @Body() body: { token: string },
  ) {
    const { token } = body;
    const isVerified = await this.verificationService.verifyToken(token, userId);
    if (isVerified) {
      return { message: 'User verified successfully' };
    }
    return { message: 'Verification failed' };
  }
}