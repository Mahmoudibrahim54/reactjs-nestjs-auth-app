import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() req: LoginDto) {
    const { email, password } = req;
    return this.authService.login(email, password);
  }
  @Post('verify-token')
  verifyToken(@Body() body: { token: string }) {
    if (typeof body.token !== 'string') {
      throw new Error('Invalid token type. Expected a string.');
    }
    return this.authService.verifyToken(body.token);
  }
}
