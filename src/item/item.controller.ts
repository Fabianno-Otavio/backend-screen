import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemService } from './item.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { AdminRoles } from 'src/user/constants/roles.constants';
import { Roles } from 'src/decorators/roles.decorator';

@UseGuards(AuthGuard)
@Controller('item')
export class ItemController {
    constructor(private readonly itemService: ItemService) {}

    @Post()
    createItem(@Body() data: CreateItemDto) {
        return this.itemService.createItem(data);
    }

    @UseGuards(RolesGuard)
    @Roles(AdminRoles)
    @Get()
    getAllItems() {
        return this.itemService.findAll();
    }

    @Get()
    getItemsByUser(@Param() id: string) {
        return this.itemService.findAllByUser(id);
    }
}
