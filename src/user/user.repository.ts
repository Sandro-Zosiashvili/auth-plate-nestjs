import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import {Injectable, NotFoundException} from "@nestjs/common";

@Injectable()
export class UserRepository {

    constructor( @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    create(createUserDto: CreateUserDto) {
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
    }

   async findAll()  {
        const users = await this.userRepository
          .createQueryBuilder('user')
          .getMany();
        if(!users) {
            throw new NotFoundException({
                message:"User not found",
                error: "Not Found"
            });
        }
        return users;
   }



}