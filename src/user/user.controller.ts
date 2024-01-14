import { AdminRoles } from './constants/roles.constants';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
    constructor(private readonly usersService: UserService) {}

    @UseGuards(RolesGuard)
    @Roles(AdminRoles)
    @Post()
    create(@Body() data: CreateUserDto): Promise<GetUserDto> {
        return this.usersService.create(data);
    }

    @UseGuards(RolesGuard)
    @Roles(AdminRoles)
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

    @UseGuards(RolesGuard)
    @Roles(AdminRoles)
    @Delete(':id')
    remove(@Param('id') id: string): Promise<GetUserDto> {
        return this.usersService.remove(id);
    }
}
