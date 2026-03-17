import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/user.repository';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepo: UserRepository,
  ) {}

  async adminLogin(data: CreateAuthDto) {
    const user = await this.userRepo.findByEmail(data.email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (!user.isAdmin) {
      throw new HttpException('Admin access only', HttpStatus.FORBIDDEN);
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const payload = { id: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async userRegister(data: CreateUserDto) {
    const user = await this.userRepo.findByEmail(data.email);

    if (user) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.userRepo.create({
      ...data,
      password: hashedPassword,
    });
  }

  async userLogin(data: CreateAuthDto) {
    const user = await this.userRepo.findByEmail(data.email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const payload = { id: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
