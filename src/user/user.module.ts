import { Module } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseModule } from 'src/database/database.module';
import { User, UserSchema } from 'src/user/model/user.schema';
import { UserController } from 'src/user/user.controller';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
