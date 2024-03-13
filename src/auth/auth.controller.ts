import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import createNewAccountDto from './dto/createNewAccount.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './gurads/local-auth.guard';
import { JwtAuthGuard } from './gurads/jwt-auth.guard';
import { UserInfoService } from 'src/user-info/user-info.service';
import { Response } from 'express';
import ChangePasswordDto from 'src/users/dto/changePassword.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userInfoService: UserInfoService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body('newAccount') newAccount: createNewAccountDto) {
    return this.authService.register(newAccount);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const result = await this.authService.login(req.user);
    req.session.user = {
      refreshToken: result.refresh_token,
    };
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('current-user')
  async currentUser(@Request() req) {
    const { id } = req.user;
    const userInfo = await this.userInfoService.findById(id);
    const {
      _id,
      isDarkMode,
      firstname,
      lastname,
      birthday,
      numberphone,
      sex,
      avatar,
    } = userInfo;
    const { email, isActive, isVerify } = userInfo.userId;
    return {
      id: _id,
      firstname,
      lastname,
      birthday,
      numberphone,
      sex,
      avatar,
      email,
      isActive,
      isVerify,
      isDarkMode,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put('current-user')
  async updateDarkMode(@Request() req) {}

  @Post('refresh-token')
  async refreshToken(
    @Body('refreshToken') refreshToken: string,
    @Res() res: Response,
  ) {
    const result = await this.authService.refreshToken(refreshToken);
    if (!result) {
      return res.sendStatus(404);
    }
    return res.json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Put('change-password')
  async changePassword(
    @Request() req,
    @Body('changePassword') changePassword: ChangePasswordDto,
  ) {
    const { userId } = req.user;
    const result = await this.usersService.changePassword(
      userId,
      changePassword,
    );
    return result;
  }

  // @UseGuards(JwtAuthGuard)
  // @Put('block-user/:id')
  // async blockUser(@Request() req, @Param('id') id: string) {
  //   const { userId } = req.user;
  //   const result = await this.userInfoService.blockUser(userId, id);
  //   return result;
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('get-blocking-user-list')
  // async getBlockingUserList(@Request() req) {
  //   const { userId } = req.user;
  //   const result = await this.userInfoService.getBlockingUserList(userId);
  //   return result;
  // }

  // @UseGuards(JwtAuthGuard)
  // @Delete('unblock-user/:id')
  // async unblockUser(@Request() req, @Param('id') id: string) {
  //   const { userId } = req.user;
  //   const result = await this.userInfoService.unBlockUser(userId, id);
  //   return result;
  // }
}
