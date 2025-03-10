import * as bcrypt from 'bcrypt';
import {
  Injectable,
  Dependencies,
  UnauthorizedException,
  Logger,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../users/service/user.service';
import { IUserResponse } from 'src/users/user.interface';
@Dependencies(UserService, JwtService)
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    this.userService = userService;
    this.jwtService = jwtService;
  }
  async validateUser(email: string, password: string): Promise<IUserResponse> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      this.logger.log('None user with email' + email + 'tried to login');
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      this.logger.log(
        'user with email' + email + 'provided wrong password for login',
      );

      return null;
    }

    const responseUser = this.userService.getResponseUser(user.id);

    return responseUser;
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ user: IUserResponse; access_token: string }> {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user._id };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
  verifyToken(token: string): boolean {
    if (!token || typeof token !== 'string' || token.split('.').length !== 3) {
      throw new HttpException('Invalid JWT format', HttpStatus.BAD_REQUEST);
    }

    try {
      const decode: object = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      if (decode) return true; // Valid token
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'JWT verification failed',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
