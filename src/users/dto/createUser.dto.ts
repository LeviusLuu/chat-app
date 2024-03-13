import * as mongoose from 'mongoose';

export class CreateUserDto {
  email: string;
  password: string;
}

export default CreateUserDto;
