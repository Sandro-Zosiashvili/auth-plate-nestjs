import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('register')
  // userRegister(@Body() data: CreateUserDto) {
  //   return this.authService.userRegister(data);
  // }

  @Post('login')
  userLogin(@Body() data: CreateUserDto) {
    return this.authService.userLogin(data);
  }
}