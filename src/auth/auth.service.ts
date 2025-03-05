import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { hash, compare } from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async getHello() {
    return 'Please access /auth/register or /auth/login to register or login';
  }

  async register(dto: RegisterDto) {
    const { password, username } = dto;

    const existingUser = await this.prisma.user.findUnique({
      where: { username: username },
    });

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    const { password: _, ...result } = user;

    return {
      user: result,
      message: 'User created successfully',
      statusCode: HttpStatus.CREATED,
    };
  }

  async login(dto: LoginDto) {
    const { password, username } = dto;

    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password: _, ...result } = user;

    return {
      user: result,
      token: 'fake token',
      message: 'Login successful',
      statusCode: HttpStatus.OK,
    };
  }
}
