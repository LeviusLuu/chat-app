import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserInfo, darkMode } from './userInfo.scherma';
import { Model, Types } from 'mongoose';
import CreateUserInfoDto from './dto/createUser.dto';
import UpdateUsernameDto from './dto/updateUsername.dto';
import { User } from 'src/users/user.schema';

@Injectable()
export class UserInfoService {
  constructor(
    @InjectModel(UserInfo.name) private userInfoModel: Model<UserInfo>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createUserInfo(userInfo: CreateUserInfoDto) {
    const result = new this.userInfoModel({ ...userInfo, avatar: '' });
    await result.save();
    return result;
  }

  async getUserInfoByUserId(userId: string) {
    const result = await this.userInfoModel
      .findOne({ userId })
      .populate('userId', '-password')
      .populate('blockingList');
    return result;
  }

  async findById(id: String) {
    const result = await this.userInfoModel
      .findById(id)
      .populate('userId', '-password')
      .populate('blockingList');
    return result;
  }

  //   async updateUsername(newUsername: UpdateUsernameDto, id: string) {
  //     const result = await this.userInfoModel.findOneAndUpdate(
  //       { userId: id },
  //       newUsername,
  //     );

  //     return result;
  //   }

  //   async searchUserInfo(userId: string, searchString: string, searchBy: string) {
  //     if (searchBy == 'Email') {
  //       const users = await this.userModel.findOne({
  //         email: searchString,
  //         _id: { $ne: userId },
  //       });
  //       const list = await this.userInfoModel
  //         .find({ userId: { $in: users } })
  //         .populate('userId', 'email')
  //         .populate({ path: 'friends', match: { userId } })
  //         .populate({
  //           path: 'requestFriends',
  //           match: { $or: [{ senderId: userId }, { receiverId: userId }] },
  //         });
  //       return list;
  //     }

  //     if (searchBy == 'Numberphone') {
  //       const result = await this.userInfoModel
  //         .find({ numberphone: searchString })
  //         .populate('userId', 'email');
  //       return result;
  //     }

  //     if (searchBy == 'Username') {
  //       if (searchString.length == 0) return [];

  //       const result = await this.userInfoModel
  //         .find({
  //           $expr: {
  //             $regexMatch: {
  //               input: { $concat: ['$firstname', ' ', '$lastname'] },
  //               regex: searchString,
  //               options: 'i',
  //             },
  //           },
  //         })
  //         .populate('userId', 'email');
  //       return result;
  //     }

  //     return [];
  //   }

  //   async getUserInfoList(users: Array<string>) {
  //     const result = await this.userInfoModel.find(
  //       { userId: { $in: users } },
  //       '_id',
  //     );

  //     const userInfoIdList = await Promise.all(
  //       result.map(async (v: any, i: number) => {
  //         return v._id.toString();
  //       }),
  //     );
  //     return userInfoIdList;
  //   }

  //   async addFriend(userInfoList: Array<string>) {
  //     const userInfo = await this.userInfoModel
  //       .find({
  //         userId: { $in: userInfoList },
  //       })
  //       .populate('friends');

  //     userInfo.forEach((v) => {
  //       const userInfoId = userInfo.filter((x) => x.userId != v.userId)[0];
  //       v.friends.push(userInfoId);
  //       v.save();
  //     });

  //     return userInfo;
  //   }

  //   async deleteFriend(userInfoList: Array<string>) {
  //     const userInfo = await this.userInfoModel.find({
  //       _id: { $in: userInfoList },
  //     });

  //     userInfo.forEach((value: any) => {
  //       const userInfoId = userInfoList.filter(
  //         (x) => x.toString() != value._id.toString(),
  //       )[0];
  //       value.friends.pull(userInfoId);
  //       value.save();
  //     });

  //     return userInfo;
  //   }

  //   async getMyFriendList(id: string) {
  //     const result = await this.userInfoModel.findOne({ userId: id }).populate({
  //       path: 'friends',
  //     });

  //     return result.friends;
  //   }

  //   async addRequestFriend(userInfoList: Array<string>, requestId: string) {
  //     const userInfo = await this.userInfoModel.updateMany(
  //       {
  //         _id: { $in: userInfoList },
  //       },
  //       { $push: { requestFriends: requestId } },
  //     );

  //     return userInfo;
  //   }

  //   async deleteRequestFriend(userList: Array<string>, requestId: string) {
  //     const userInfo = await this.userInfoModel.updateMany(
  //       {
  //         userId: { $in: userList },
  //       },
  //       { $pull: { requestFriends: requestId } },
  //     );

  //     return userInfo;
  //   }

  //   async getFriendRequestList(id: string, arr: Array<string>) {
  //     const userRequestList = await this.userInfoModel
  //       .findOne({ userId: id })
  //       .populate({
  //         path: 'requestFriends',
  //         match: { status: 'waiting', senderId: { $nin: arr } },
  //         select: 'senderId',
  //       })
  //       .select('requestFriends');

  //     const userIdList = userRequestList.requestFriends.map((v) => {
  //       return v.senderId;
  //     });

  //     const result = await this.userInfoModel
  //       .find({
  //         userId: { $in: userIdList },
  //       })
  //       .populate('userId', 'email')
  //       .populate({
  //         path: 'requestFriends',
  //         match: { status: 'waiting', receiverId: id },
  //       })
  //       .limit(12);
  //     return result;
  //   }

  //   async getSumFriendRequest(id: string) {
  //     const userRequestList = await this.userInfoModel
  //       .findOne({ userId: id })
  //       .populate({
  //         path: 'requestFriends',
  //         match: { status: 'waiting' },
  //         select: 'senderId',
  //       });

  //     return userRequestList.requestFriends.length;
  //   }

  //   async getUserInfo(id: string, userId: string) {
  //     try {
  //       const result = await this.userInfoModel
  //         .findOne({ userId: id })
  //         .populate({
  //           path: 'requestFriends',
  //           match: { $or: [{ senderId: userId }, { receiverId: userId }] },
  //           select: 'senderId status',
  //         })
  //         .populate({
  //           path: 'friends',
  //         })
  //         .populate('userId', 'email');
  //       if (result) return result;
  //     } catch (err: any) {
  //       if (err) return null;
  //     }
  //   }

  //   async blockUser(userId: string, id: string) {
  //     const userBlock = await this.userInfoModel.findById(id);

  //     if (userBlock) {
  //       const result = await this.userInfoModel.findOneAndUpdate(
  //         { userId },
  //         {
  //           $push: { blockingList: userBlock._id },
  //           $pull: { friends: userBlock._id },
  //         },
  //       );
  //       if (result) return userBlock;
  //     }

  //     return null;
  //   }

  //   async unBlockUser(userId: string, id: string) {
  //     const userBlock = await this.userInfoModel.findById(id);

  //     if (userBlock) {
  //       const result = await this.userInfoModel.findOneAndUpdate(
  //         { userId },
  //         { $pull: { blockingList: userBlock._id } },
  //       );
  //       if (result) return userBlock;
  //     }

  //     return null;
  //   }

  //   async getBlockingUserList(userId: string) {
  //     const result = await this.userInfoModel
  //       .findOne({ userId })
  //       .populate('blockingList');

  //     return result.blockingList;
  //   }

  //   async changeIsDarkMode(userId: string, isDarkMode: darkMode) {
  //     const result = this.userInfoModel.findOneAndUpdate(
  //       { userId },
  //       { isDarkMode },
  //     );

  //     return result;
  //   }

  //   async changeAllowSeeFriends(userId: string, allowSeeFriends: number) {
  //     const result = this.userInfoModel.findOneAndUpdate(
  //       { userId },
  //       { allowSeeFriends },
  //     );

  //     return result;
  //   }

  //   async changeAllowSeeMutualFriends(
  //     userId: string,
  //     allowSeeMutualFriends: number,
  //   ) {
  //     const result = this.userInfoModel.findOneAndUpdate(
  //       { userId },
  //       { allowSeeMutualFriends },
  //     );

  //     return result;
  //   }

  //   async getFriendList(userId: string, myUserId: string) {
  //     const result = await this.userInfoModel.findOne({ userId }).populate({
  //       path: 'friends',
  //       match: { userId: { $ne: [myUserId] } },
  //     });

  //     return result.friends;
  //   }

  //   async getMutualFriendList(userId: string, myUserId: string) {
  //     const result = await this.userInfoModel.findOne({ userId }).populate({
  //       path: 'friends',
  //       match: { userId: { $ne: [myUserId] } },
  //       populate: {
  //         path: 'friends',
  //       },
  //     });

  //     const a = result.friends.filter((x: any) =>
  //       x.friends.find((e: any) => e.userId == myUserId),
  //     );

  //     return a;
  //   }

  //   async updateAvatar(userId: string, avatar: string) {
  //     const result = await this.userInfoModel.findOneAndUpdate(
  //       { userId },
  //       { avatar },
  //     );
  //     return result;
  //   }

  //   async getFriendListOfUser(
  //     userId: string,
  //     myUserId: string,
  //     perPage: number,
  //     limit: number,
  //   ) {
  //     const userInfo = await this.userInfoModel
  //       .findOne({ userId }, 'friends')
  //       .populate({
  //         path: 'friends',
  //         match: { userId: { $ne: [myUserId] } },
  //       });

  //     const total = userInfo.friends.length;

  //     const skip = (perPage - 1) * limit;
  //     const result = await this.userInfoModel
  //       .findOne({ userId }, 'friends')
  //       .populate({
  //         path: 'friends',
  //         match: { userId: { $ne: [myUserId] } },
  //         options: { sort: { createdAt: 1 }, skip: skip, limit: limit },
  //       });

  //     if (result) return { friends: result.friends, total, perPage: perPage };
  //     return null;
  //   }

  //   async searchFriendsOfUser(
  //     userId: string,
  //     myUserId: string,
  //     perPage: number,
  //     limit: number,
  //     searchString: string,
  //   ) {
  //     const userInfo = await this.userInfoModel
  //       .findOne({ userId }, 'friends')
  //       .populate({
  //         path: 'friends',
  //         match: {
  //           userId: { $ne: [myUserId] },
  //           $expr: {
  //             $regexMatch: {
  //               input: { $concat: ['$firstname', ' ', '$lastname'] },
  //               regex: searchString,
  //               options: 'i',
  //             },
  //           },
  //         },
  //       });

  //     const total = userInfo.friends.length;

  //     const skip = (perPage - 1) * limit;
  //     const result = await this.userInfoModel
  //       .findOne(
  //         {
  //           userId,
  //         },
  //         'friends',
  //       )
  //       .populate({
  //         path: 'friends',
  //         match: {
  //           userId: { $ne: [myUserId] },
  //           $expr: {
  //             $regexMatch: {
  //               input: { $concat: ['$firstname', ' ', '$lastname'] },
  //               regex: searchString,
  //               options: 'i',
  //             },
  //           },
  //         },
  //         options: { sort: { createdAt: 1 }, skip: skip, limit: limit },
  //       });

  //     if (result) return { friends: result.friends, total, perPage: perPage };
  //     return null;
  //   }
}
