import { GuardsModule } from 'src/guards/guards.module';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { Module } from '@nestjs/common';
import { CategoryModule } from 'src/category/category.module';

@Module({
    imports: [GuardsModule, CategoryModule],
    exports: [ItemService],
    providers: [ItemService],
    controllers: [ItemController],
})
export class ItemModule {}
