import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthGuard } from './auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  async getMe(@Req() req: Request & { user: { id: number } }) {
    return this.authService.getMe(req.user.id);
  }

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
