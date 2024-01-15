import { JsonValue } from '@prisma/client/runtime/library';
import {
    IsEmail,
    IsOptional,
    IsString,
    IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 8,
    })
    password: string;

    @IsOptional()
    preferences?: JsonValue;

    @IsOptional()
    item?: any;
}
