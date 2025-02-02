import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/aut.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refreshDto';
import { AuthGuard } from 'src/guard/auth.guard';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //TODO: POST SIGN UP

  @Post('signup')
  async signUp(@Body() dto: AuthDTO) {
    console.log(dto);
    return this.authService.signup(dto);
  }
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('refresh')
  async refresh(@Body() dto: RefreshDto) {
    return this.authService.refresh(dto);
  }

  @UseGuards(AuthGuard)
  @Get('test')
  async test(@Req() req) {
    return { Message: 'Message here u have rights', UserId: req.userId };
  }
  @UseGuards(AuthGuard)
  @Put('change-password')
  async changePassword(@Body() dto: ChangePasswordDto, @Req() req) {
    return this.authService.changePassword(dto, req.userId);
  }
}
