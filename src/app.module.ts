import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    JwtModule.register({ global: true, secret: 'secret' }),
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost:27017/auth'),
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
