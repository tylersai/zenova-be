import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { Model } from 'mongoose';
import SignupPayload from 'src/auth/dto/signup';
import { hashPassword } from 'src/utils/auth';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }

  async getProfileByEmail(email: string) {
    return await this.userModel.findOne({ email }).select('-password').exec();
  }

  async createUser(userPayload: SignupPayload) {
    const { name, email, password } = userPayload || {};
    const hashedPassword = await hashPassword(password);
    const user = await new this.userModel({
      name,
      email,
      password: hashedPassword,
    }).save();
    return user;
  }
}
