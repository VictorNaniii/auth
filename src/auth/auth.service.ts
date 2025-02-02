import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDTO } from './dto/aut.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AuthModel } from './auth.model';
import { Model } from 'mongoose';
import { compare, hash } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './refresh.token.schema';
import { v4 as uuidv4 } from 'uuid';
import { RefreshDto } from './dto/refreshDto';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthModel.name) private readonly authModel: Model<AuthModel>,
    @InjectModel(RefreshToken.name)
    private readonly refreshToken: Model<RefreshToken>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: AuthDTO) {
    const existEmail = await this.authModel.findOne({ email: dto.email });
    if (existEmail) throw new BadRequestException('THIS EMAIL ALREADY EXIST');
    const hashPassword = await hash(dto.password, 10);

    const newUser: AuthDTO = {
      name: dto.name,
      email: dto.email,
      password: hashPassword,
    };
    await this.authModel.create(newUser);
    return newUser;
  }

  async login({ email, password }: LoginDto) {
    const existUser = await this.authModel.findOne({ email });
    if (!existUser)
      throw new UnauthorizedException('This user not exit please sign in');

    const passwordMatch = await compare(password, existUser.password);
    if (!passwordMatch) throw new BadRequestException('Incorrect password');

    const token = await this.generateUserToken(existUser._id);
    return {
      ...token,
      userId: existUser._id,
    };
  }

  async generateUserToken(userId) {
    const accestToken = this.jwtService.sign({ userId }, { expiresIn: '1h' });

    const refreshToken = uuidv4();

    await this.stroeRefreshToken(refreshToken, userId);
    return { accestToken, refreshToken };
  }

  async stroeRefreshToken(token: string, userId) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);
    await this.refreshToken.updateOne(
      { userId },
      { $set: { expiryDate, token } },
      {
        upsert: true,
      },
    );
  }

  async refresh(dto: RefreshDto) {
    const token = await this.refreshToken.findOne({
      token: dto.token,
      expiryDate: { $gte: new Date() },
    });

    if (!token) {
      throw new UnauthorizedException('Refresh Token is Invalid');
    }

    return this.generateUserToken(token.userId);
  }
}
