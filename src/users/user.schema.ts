import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: true })
  isActive: Boolean;

  @Prop({ required: true, default: false })
  isVerify: Boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', function (next: Function) {
  const user = this;
  if (user.password) {
    bcrypt.genSalt(10, function (err: any, salt: string) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, (err: any, hash: string) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  }
});
