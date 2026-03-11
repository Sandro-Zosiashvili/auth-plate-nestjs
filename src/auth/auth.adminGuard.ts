// admin.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request['user'] as {
      id: number;
      email: string;
      isAdmin: boolean;
    };
    console.log(user);

    if (!user?.isAdmin) {
      throw new ForbiddenException('Admin access only');
    }

    return true;
  }
}
