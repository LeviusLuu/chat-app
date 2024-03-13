import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/user.schema';
import { UsersService } from 'src/users/users.service';
import { UserInfoService } from 'src/user-info/user-info.service';
import { UserInfo, UserInfoSchema } from 'src/user-info/userInfo.scherma';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { Session, SessionSchema } from './session.sherna';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: UserInfo.name,
        schema: UserInfoSchema,
      },
      {
        name: Session.name,
        schema: SessionSchema,
      },
    ]),
    PassportModule,
    JwtModule.register({
      secret: process.env.SERCET_ACCESSTOKEN,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    UserInfoService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
