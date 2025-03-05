import { Body, Controller, Get, Post, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, RegisterSchema } from './dto/register.dto';
import { LoginDto, LoginDtoSchema } from './dto/login.dto';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  getHello() {
    return this.authService.getHello();
  }

  @Post('register')
  @HttpCode(201) // Created
  register(@Body(new ZodValidationPipe(RegisterSchema)) dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(200) // OK
  login(@Body(new ZodValidationPipe(LoginDtoSchema)) dto: LoginDto) {
    return this.authService.login(dto);
  }
}
