import { Controller, Post, Body, Param } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
@ApiTags('verification')
@Controller('verification')
export class VerificationController {
  constructor(private verificationService: VerificationService) {}

  // Endpoint to create a new verification token and send it to the user's email
  @Post('create')
@ApiOperation({ summary: 'get verification code to get verified'})
@ApiResponse({ status:201, description: 'Verification code sent successfully'})
@ApiResponse({ status:400, description: 'Bad request'})
  async createVerificationToken(@Body() body: { userId: number }) {
    const { userId } = body;
    const token = await this.verificationService.createVerificationToken(userId);
    return { message: 'Verification code sent successfully', token };
  }

  @Post('verify/:userId')
  @ApiOperation({summary: 'verify user by adding token'})
  @ApiResponse({status: 201, description: 'User verified successfully'})
  @ApiResponse({status: 400, description: 'Bad Request'})
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