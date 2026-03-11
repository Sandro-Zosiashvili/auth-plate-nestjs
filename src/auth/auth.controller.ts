import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ThrottlerGuard } from '@nestjs/throttler';

@UseGuards(ThrottlerGuard)
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  userRegister(@Body() data: CreateUserDto) {
    return this.authService.userRegister(data);
  }

  @Post('login')
  userLogin(@Body() data: CreateAuthDto) {
    return this.authService.userLogin(data);
  }
}
