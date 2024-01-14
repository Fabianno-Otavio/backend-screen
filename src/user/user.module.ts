import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
    imports: [PrismaModule, JwtModule],
    exports: [UserService],
    controllers: [UserController],
    providers: [UserService, AuthService],
})
export class UserModule {}
