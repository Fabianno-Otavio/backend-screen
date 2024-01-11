import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        const { authorization } = req.headers;
        try {
            const token = authorization.split(' ')[1];
            const access_token = await this.authService.checkToken(token);
            req.access_token = access_token;
            const user = await this.userService.findOne(access_token.id);
            req.user = user;
            return true;
        } catch (error) {
            return false;
        }
    }
}
