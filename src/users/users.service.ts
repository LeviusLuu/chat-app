import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import CreateUserDto from './dto/createUser.dto';
import ChangePasswordDto from './dto/changePassword.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createuser(user: CreateUserDto) {
    const result = new this.userModel(user);
    await result.save();
    return result;
  }

  async findOneByEmail(email: string) {
    const result = await this.userModel.findOne({ email });
    return result;
  }

  async checkExist(id: string) {
    const result = await this.userModel.exists({ _id: id });
    return result;
  }

  async changePassword(id: string, changePassword: ChangePasswordDto) {
    const { newPassword, currentPassword } = changePassword;
    const user = await this.userModel.findById(id);
    if (user) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (isMatch) {
        user.password = newPassword;
        const result = await user.save();
        if (result) {
          return true;
        }
      }
    }
    return false;
  }
}
