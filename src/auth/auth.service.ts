import * as bcrypt from 'bcrypt';
import { GetUserDto } from 'src/user/dto/get-user.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) {}

    public async login(data: {
        username: string;
        password: string;
    }): Promise<{ access_token: string }> {
        const user = await this.prisma.user.findFirst({
            where: {
                username: data.username,
            },
        });

        if (!user) {
            throw new UnauthorizedException('E-mail e/ou senha inválidos.');
        } else if (!(await bcrypt.compare(data.password, user.password))) {
            throw new UnauthorizedException('E-mail e/ou senha inválidos.');
        }

        return this.createToken(user);
    }

    private createToken(user: GetUserDto): { access_token: string } {
        const payload = {
            ...user,
            role: 'user',
        };

        return {
            access_token: this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET,
                expiresIn: '30d',
                issuer: 'auth/login',
                audience: 'users',
            }),
        };
    }

    public checkToken(token: string): {
        id: string;
        username: string;
        email: string;
        role: string;
    } {
        try {
            return this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET,
                issuer: 'auth/login',
                audience: 'users',
            });
        } catch (e) {
            throw new BadRequestException('Token inválido.');
        }
    }
}
