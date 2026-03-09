import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
// import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/user.repository';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    // private jwtService: JwtService,
    private userRepose: UserRepository,
  ) {}

  async userLogin(data: CreateAuthDto) {
    // 1. იუზერი არსებობს?
    console.log(data);
    const user = await this.userRepose.findByEmail(data.email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    //
    // // 2. პაროლი სწორია?
    // const isPasswordValid = await bcrypt.compare(data.password, user.password);
    //
    // if (!isPasswordValid) {
    //   throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    // }
    //
    // // 3. JWT token დაბრუნება
    // const payload = { sub: user.id, email: user.email };
    //
    // return {
    //   access_token: await this.jwtService.signAsync(payload),
    // };
  }
}
