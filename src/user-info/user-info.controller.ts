import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import UpdateUsernameDto from './dto/updateUsername.dto';
import { JwtAuthGuard } from 'src/auth/gurads/jwt-auth.guard';
import { darkMode } from './userInfo.scherma';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from 'src/storage/storage.service';
import { Response } from 'express';

@Controller('user-info')
export class UserInfoController {
  constructor(
    private readonly userInfoService: UserInfoService,
    private readonly storageService: StorageService,
  ) {}

  // @UseGuards(JwtAuthGuard)
  // @Put('update-username')
  // async updateUsername(
  //   @Request() req,
  //   @Body('newUsername') newUsername: UpdateUsernameDto,
  // ) {
  //   const { userId } = req.user;
  //   const result = await this.userInfoService.updateUsername(
  //     newUsername,
  //     userId,
  //   );
  //   return result;
  // }

  // @UseGuards(JwtAuthGuard)
  // @Post('find-user-info')
  // async findUserInfo(
  //   @Request() req,
  //   @Body('searchString') searchString: string,
  //   @Body('searchBy') searchBy: string,
  // ) {
  //   const { userId } = req.user;
  //   const result = await this.userInfoService.searchUserInfo(
  //     userId,
  //     searchString,
  //     searchBy,
  //   );

  //   return result;
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('get-my-friend-list')
  // async getMyFriendList(@Request() req) {
  //   const { userId } = req.user;
  //   const result = await this.userInfoService.getMyFriendList(userId);
  //   return result;
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('get-user-info/:id')
  // async getUserInfo(
  //   @Request() req,
  //   @Res() res: Response,
  //   @Param('id') id: string,
  // ) {
  //   const userId = req.user.userId;
  //   const result = await this.userInfoService.getUserInfo(id, userId);
  //   return res.json(result);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Put('change-is-dark-mode')
  // async changeIsDarkMode(
  //   @Request() req,
  //   @Body('isDarkMode') isDarkMode: darkMode,
  // ) {
  //   const userId = req.user.userId;
  //   const result = await this.userInfoService.changeIsDarkMode(
  //     userId,
  //     isDarkMode,
  //   );
  //   return result;
  // }

  // @UseGuards(JwtAuthGuard)
  // @Put('change-allow-see-friends')
  // async changeAllowSeeFriends(
  //   @Request() req,
  //   @Body('allowSeeFriends') allowSeeFriends: number,
  // ) {
  //   const userId = req.user.userId;
  //   const result = await this.userInfoService.changeAllowSeeFriends(
  //     userId,
  //     allowSeeFriends,
  //   );
  //   return result;
  // }

  // @UseGuards(JwtAuthGuard)
  // @Put('change-allow-see-mutual-friends')
  // async changeAllowSeeMutualFriends(
  //   @Request() req,
  //   @Body('allowSeeMutualFriends') allowSeeMutualFriends: number,
  // ) {
  //   const userId = req.user.userId;
  //   const result = await this.userInfoService.changeAllowSeeMutualFriends(
  //     userId,
  //     allowSeeMutualFriends,
  //   );
  //   return result;
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('get-friend-list/:id')
  // async getFriendList(@Request() req, @Param('id') id: string) {
  //   const userId = req.user.userId;
  //   const result = await this.userInfoService.getFriendList(id, userId);
  //   return result;
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('get-mutatul-friend-list/:id')
  // async getMututalFriendList(@Request() req, @Param('id') id: string) {
  //   const userId = req.user.userId;
  //   const result = await this.userInfoService.getMutualFriendList(id, userId);
  //   return result;
  // }

  // @UseGuards(JwtAuthGuard)
  // @UseInterceptors(FileInterceptor('file'))
  // @Post('update-avatar')
  // async updateAvatar(
  //   @Request() req,
  //   @UploadedFile('file') file: Express.Multer.File,
  // ) {
  //   const result = await this.storageService.save(
  //     'avatar/' + file.originalname,
  //     file.mimetype,
  //     file.buffer,
  //   );

  //   if (result) {
  //     const { userId } = req.user;

  //     const updateAvatar = await this.userInfoService.updateAvatar(
  //       userId,
  //       result,
  //     );
  //     if (updateAvatar) {
  //       return result;
  //     }
  //   }

  //   return false;
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('get-friend-list-of-user')
  // async getFriendListOfUser(
  //   @Request() req,
  //   @Query('id') id: string,
  //   @Query('perPage') perPage: number,
  //   @Query('limit') limit: number,
  // ) {
  //   const userId = req.user.userId;
  //   const result = await this.userInfoService.getFriendListOfUser(
  //     id,
  //     userId,
  //     perPage,
  //     limit,
  //   );
  //   return result;
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('search-friends-of-user')
  // async searchFriendsOfUser(
  //   @Request() req,
  //   @Query('id') id: string,
  //   @Query('perPage') perPage: number,
  //   @Query('limit') limit: number,
  //   @Query('searchkey') searchKey: string,
  // ) {
  //   const userId = req.user.userId;
  //   const result = await this.userInfoService.searchFriendsOfUser(
  //     id,
  //     userId,
  //     perPage,
  //     limit,
  //     searchKey,
  //   );
  //   return result;
  // }
}
