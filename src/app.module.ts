import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { PreferenceModule } from './preference/preference.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [UserModule, AuthModule, PreferenceModule],
})
export class AppModule {}
