import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { JsonValue } from '@prisma/client/runtime/library';

export class GetUserDto extends OmitType(CreateUserDto, ['password'] as const) {
    id: string;
    role: string;
    preferences?: JsonValue;
}
