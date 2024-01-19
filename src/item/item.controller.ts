import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemService } from './item.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { AdminRoles } from 'src/user/constants/roles.constants';
import { Roles } from 'src/decorators/roles.decorator';
import { UpdateItemDto } from './dto/update-item.dto';

@UseGuards(AuthGuard)
@Controller('item')
export class ItemController {
    constructor(private readonly itemService: ItemService) {}

    @Post(':id')
    createItem(@Param('id') id: string, @Body() data: CreateItemDto) {
        return this.itemService.createItem(id, data);
    }

    @UseGuards(RolesGuard)
    @Roles(AdminRoles)
    @Get()
    getAllItems() {
        return this.itemService.findAll();
    }

    @Get(':id')
    getItemsByUser(@Param('id') id: string) {
        return this.itemService.findAllByUser(id);
    }

    @Put(':userId/:itemId')
    editItem(
        @Param('userId') userId: string,
        @Param('itemId') itemId: string,
        @Body() data: UpdateItemDto,
    ) {
        return this.itemService.updateItem(userId, itemId, data);
    }

    @Delete(':id')
    deleteItem(@Param('id') itemId: string) {
        return this.itemService.deleteItem(itemId);
    }

    @UseGuards(RolesGuard)
    @Roles(AdminRoles)
    @Delete(':id')
    deleteAllUserItems(@Param('id') userId: string) {
        return this.itemService.deleteAllUserItems(userId);
    }
}
