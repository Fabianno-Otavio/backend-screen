import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class GetUserDto extends OmitType(CreateUserDto, ['password'] as const) {
    id: string;
    role: string;
}
