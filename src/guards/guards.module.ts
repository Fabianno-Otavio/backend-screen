import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [UserModule, JwtModule],
    exports: [UserModule, AuthService, JwtModule],
    providers: [AuthService],
})
export class GuardsModule {}
