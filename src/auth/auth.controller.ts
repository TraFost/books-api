import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  // example how to protect route with jwt
  // UseGuards,
} from '@nestjs/common';

import { LoginDto, LoginDtoSchema } from './dto/login.dto';
import { RegisterDto, RegisterSchema } from './dto/register.dto';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';

// example how to protect route with jwt
// import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // example how to protect route with jwt
  // @UseGuards(JwtAuthGuard)
  @Get()
  getHello() {
    return this.authService.getHello();
  }

  @Post('register')
  @HttpCode(201)
  register(@Body(new ZodValidationPipe(RegisterSchema)) dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body(new ZodValidationPipe(LoginDtoSchema)) dto: LoginDto) {
    return this.authService.login(dto);
  }
}
