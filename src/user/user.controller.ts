import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserDto } from './dto/get-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly usersService: UserService) {}

    @Post()
    create(@Body() data: CreateUserDto): Promise<GetUserDto> {
        return this.usersService.create(data);
    }

    @Get()
    findAll(): Promise<GetUserDto[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<GetUserDto> {
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() data: UpdateUserDto,
    ): Promise<GetUserDto> {
        return this.usersService.update(id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<GetUserDto> {
        return this.usersService.remove(id);
    }
}
