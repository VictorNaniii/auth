import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModel, authSchema } from './auth.model';
import {
  RefreshToken,
  RefreshTokenSchema,
} from './schema/refresh.token.schema';
import { ResetToken, ResetTokenSchema } from './schema/reset-token.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AuthModel.name,
        schema: authSchema,
      },
      {
        name: RefreshToken.name,
        schema: RefreshTokenSchema,
      },
      {
        name: ResetToken.name,
        schema: ResetTokenSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
