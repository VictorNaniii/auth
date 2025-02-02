import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/aut.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refreshDto';
import { AuthGuard } from 'src/guard/auth.guard';

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
    return { Mesage: 'Message here u have rights', UserId: req.userId };
  }
}
