import * as mongoose from 'mongoose';

export class CreateUserInfoDto {
  firstname: string;
  lastname: string;
  birthday: Date;
  numberphone: string;
  sex: string;
  userId: mongoose.Types.ObjectId;
}

export default CreateUserInfoDto;
