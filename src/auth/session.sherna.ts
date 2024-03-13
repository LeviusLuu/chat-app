import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
export type SessionDocument = HydratedDocument<Session>;

class SessionDto {
  cookie: object;
  user: {
    refreshToken: string;
  };
}

@Schema({ timestamps: true })
export class Session {
  @Prop({ required: true })
  expires: Date;

  @Prop({ required: true })
  session: SessionDto;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
