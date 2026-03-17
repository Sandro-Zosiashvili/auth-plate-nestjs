// admin.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly userRepo: UserRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const userPayload = request['user'] as { id: number };

    // DB check
    const user = await this.userRepo.findOne(userPayload.id);

    if (!user || !user.isAdmin) {
      throw new ForbiddenException('Admin access only');
    }

    request['user'] = user;

    return true;
  }
}
