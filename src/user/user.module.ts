import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [PrismaModule, JwtModule],
    exports: [UserService, PrismaModule],
    controllers: [UserController],
    providers: [UserService, AuthService],
})
export class UserModule {}
