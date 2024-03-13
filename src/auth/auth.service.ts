import { Injectable, UnauthorizedException } from '@nestjs/common';
import CreateUserDto from 'src/users/dto/createUser.dto';
import createNewAccountDto from './dto/createNewAccount.dto';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/users/users.service';

import * as mongoose from 'mongoose';
import { UserInfoService } from 'src/user-info/user-info.service';
import CreateUserInfoDto from 'src/user-info/dto/createUser.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Session } from './session.sherna';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Session.name)
    private readonly sessionModel: mongoose.Model<Session>,
    private readonly usersService: UsersService,
    private readonly userInfoService: UserInfoService,
    private readonly jwtService: JwtService,
  ) {}

  async register(newAccount: createNewAccountDto) {
    const { email, password, birthday, firstname, lastname, numberphone, sex } =
      newAccount;

    const newUser: CreateUserDto = {
      email,
      password,
    };

    const createUser = await this.usersService.createuser(newUser);

    const newUserInfo: CreateUserInfoDto = {
      birthday,
      firstname,
      lastname,
      numberphone,
      sex,
      userId: new mongoose.Types.ObjectId(createUser.id),
    };

    const createUserInfo =
      await this.userInfoService.createUserInfo(newUserInfo);

    if (createUser && createUserInfo) {
      return true;
    }
    return false;
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const userInfo = await this.userInfoService.getUserInfoByUserId(
          user.id,
        );
        const { firstname, avatar, lastname, numberphone, isDarkMode } =
          userInfo;

        return {
          id: userInfo.id,
          email,
          avatar,
          firstname,
          lastname,
          numberphone,
          isDarkMode,
        };
      }
      throw new UnauthorizedException();
    }
    return null;
  }

  async login(user: any) {
    let now = new Date();
    now.setSeconds(now.getSeconds() + 3);
    return {
      ...user,
      access_token: await this.jwtService.signAsync(user, {
        expiresIn: '30000',
      }),
      accessTokenExpires: now.getTime(),
      refresh_token: await this.jwtService.signAsync(user, {
        expiresIn: '1d',
      }),
    };
  }

  async refreshToken(token: string) {
    const dbToken = await this.sessionModel
      .findOne({ 'session.user.refreshToken': token })
      .exec();
    if (dbToken) {
      const decode = this.jwtService.decode(
        dbToken.session.user.refreshToken,
      ) as any;
      if (decode) {
        const userInfo = await this.userInfoService.findById(decode.id);
        const { firstname, avatar, lastname, numberphone, isDarkMode } =
          userInfo;

        const payload = {
          id: decode.id,
          email: decode.email,
          avatar,
          firstname,
          lastname,
          numberphone,
          isDarkMode,
        };
        const access_token = await this.jwtService.signAsync(payload, {
          expiresIn: '3s',
        });
        return {
          ...payload,
          access_token: access_token,
          accessTokenExpires: new Date().getTime() + 3,
          refresh_token: token,
        };
      }
    }
    return;
  }
}
