import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/users/user.schema';

export type UserInfoDocumnet = HydratedDocument<UserInfo>;

export enum SexTypes {
  male = 'male',
  female = 'female',
  another = 'another',
}

export enum allowTypes {
  all = 0,
  friends = 1,
  none = 2,
}

export enum darkMode {
  automatic = 0,
  on = 1,
  off = 2,
}

@Schema({ timestamps: true })
export class UserInfo {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
    required: true,
    unique: true,
  })
  userId: User;

  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  birthday: Date;

  @Prop({ match: [/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/] })
  numberphone: string;

  @Prop({ required: true })
  sex: SexTypes;

  @Prop()
  avatar: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: UserInfo.name }],
  })
  contacts: UserInfo[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: UserInfo.name }],
  })
  blockingList: UserInfo[];

  @Prop({ required: true, default: 0 })
  isDarkMode: darkMode;
}

export const UserInfoSchema = SchemaFactory.createForClass(UserInfo);
