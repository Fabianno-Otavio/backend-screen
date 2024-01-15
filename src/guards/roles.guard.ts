import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/auth/auth.service';
import { Roles } from 'src/decorators/roles.decorator';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private authService: AuthService,
        private userService: UserService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { authorization } = request.headers;
        if (!authorization) {
            return false;
        }
        const token = authorization.split(' ')[1];
        const access_token = await this.authService.checkToken(token);
        request.access_token = access_token;
        const user = await this.userService.findOne(access_token.id);

        const roles = this.reflector.get(Roles, context.getHandler());
        if (!roles) {
            return true;
        }

        return roles.includes(user.role);
    }
}
