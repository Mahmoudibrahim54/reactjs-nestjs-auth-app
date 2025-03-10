import * as bcrypt from 'bcrypt';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User, UserSchema } from './users/user.schema';
import { UserService } from './users/service/user.service';
import { UserModule } from './users/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { IUser } from './users/user.interface';
import { AuthModule } from './authentication/auth.module';
import { AuthController } from './authentication/controller/auth.controller';
import { AuthService } from './authentication/service/auth.service';
import { UserController } from './users/controller/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL, {
      dbName: process.env.DATABASE_NAME,
    }),
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;

          schema.pre('save', async function (next) {
            const user = this as IUser;

            // Hash password only if it's modified or new
            if (!user.isModified('password')) return next();

            try {
              const salt = await bcrypt.genSalt(10);
              const hashedPassword = await bcrypt.hash(user.password, salt);
              user.set('password', hashedPassword);
            } catch (error) {
              next(error);
            }

            if (!user.isModified('email')) return next();
            user.set('email', user.email.toLocaleLowerCase());
            if (!user.isModified('first_name')) return next();

            user.set(
              'first_name',
              String(user.first_name[0]).toUpperCase() +
                String(user.first_name).slice(1),
            );
            if (!user.isModified('last_name')) return next();

            user.set(
              'last_name',
              String(user.last_name[0]).toUpperCase() +
                String(user.last_name).slice(1),
            );

            next();
          });

          return schema;
        },
      },
    ]),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController, UserController, AuthController],
  providers: [AppService, UserService, AuthService],
})
export class AppModule {}
