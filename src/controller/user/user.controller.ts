import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  HttpException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { UserService } from 'src/service/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.userService.createUser(createUserDto);
      return {
        message: 'User has been created successfully',
        newUser,
      };
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Error: User not created!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('/:id')
  async updateUser(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const existingUser = await this.userService.updateUser(
        userId,
        updateUserDto,
      );
      return {
        message: 'User has been successfully updated',
        existingUser,
      };
    } catch (err) {
      console.log(err);

      throw new HttpException('Error updating user', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getUsers() {
    try {
      const userData = await this.userService.getAllUsers();
      if (!userData || userData.length === 0) {
        return {
          message: 'All users data found successfully',
          userData: [],
        };
      }
      return {
        message: 'All users data found successfully',
        userData,
      };
    } catch (err) {
      console.log(err);

      throw new HttpException(
        'Error fetching users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/:id')
  async getUser(@Param('id') userId: string) {
    try {
      const existingUser = await this.userService.getUser(userId);
      return {
        message: 'User found successfully',
        existingUser,
      };
    } catch (err) {
      console.log(err);

      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  @Delete('/:id')
  async deleteUser(@Param('id') userId: string) {
    try {
      const deletedUser = await this.userService.deleteUser(userId);
      return {
        message: 'User deleted successfully',
        deletedUser,
      };
    } catch (err) {
      console.log(err);

      throw new HttpException('Error deleting user', HttpStatus.BAD_REQUEST);
    }
  }
}
