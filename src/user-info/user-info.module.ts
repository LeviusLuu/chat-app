import { Module } from '@nestjs/common';
import { UserInfoController } from './user-info.controller';
import { UserInfoService } from './user-info.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserInfo, UserInfoSchema } from './userInfo.scherma';
import { User, UserSchema } from 'src/users/user.schema';

import { StorageService } from 'src/storage/storage.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserInfo.name, schema: UserInfoSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [UserInfoController],
  providers: [UserInfoService, StorageService],
})
export class UserInfoModule {}
