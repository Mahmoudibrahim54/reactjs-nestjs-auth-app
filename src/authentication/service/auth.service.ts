import * as bcrypt from 'bcrypt';
import {
  Injectable,
  Dependencies,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../users/service/user.service';
import { IUser } from 'src/users/user.interface';
@Dependencies(UserService, JwtService)
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    this.userService = userService;
    this.jwtService = jwtService;
  }
  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<IUser, 'password'> | null> {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    // Convert to a plain object and ensure it's typed correctly
    const result = user.toObject({
      getters: true,
      versionKey: false, // Remove Mongoose-specific properties like __v
    }) as Omit<IUser, 'password'>;

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
