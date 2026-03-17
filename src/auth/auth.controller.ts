import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  userRegister(@Body() data: CreateUserDto) {
    return this.authService.userRegister(data);
  }

  @Post('admin/login')
  adminLogin(@Body() data: CreateAuthDto) {
    return this.authService.adminLogin(data);
  }

  @Post('user/login')
  userLogin(@Body() data: CreateAuthDto) {
    return this.authService.userLogin(data);
  }
}
