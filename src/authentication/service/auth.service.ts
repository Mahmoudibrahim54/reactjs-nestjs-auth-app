import * as bcrypt from 'bcrypt';
import {
  Injectable,
  Dependencies,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../users/service/user.service';
import { IUser } from 'src/users/user.interface';
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
  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<IUser, 'password'> | null> {
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

    const result = user.toObject({
      getters: true,
      versionKey: false,
    }) as Omit<IUser, 'password'>;
    this.logger.log('user with email' + email + 'logged in successfully');

    return result;
  }

  async login(
    username: string,
    password: string,
  ): Promise<{ user: Omit<IUser, 'password'>; access_token: string }> {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user._id };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
