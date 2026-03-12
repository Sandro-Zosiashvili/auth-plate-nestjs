import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create({
      ...createUserDto,
      isAdmin: false,
    });
    const savedUser = await this.userRepository.save(user);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...withoutPassword } = savedUser;
    return withoutPassword;
  }

  async findAll() {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .getMany();
    if (!users) {
      throw new NotFoundException({
        message: 'User not found',
        error: 'Not Found',
      });
    }
    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: id })
      .getOne();
    if (!user) {
      throw new NotFoundException({
        message: 'User not found',
        error: 'Not Found',
      });
    }
    return user;
  }

  async findByEmail(email: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: email })
      .getOne();
  }
}
