import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { AdminGuard } from '../auth/auth.adminGuard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard, AdminGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getMe(@Req() req: Record<string, unknown>) {
    const user = req['user'] as {
      id: number;
      email: string;
      isAdmin: boolean;
    };
    return this.userService.findOne(user.id);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
