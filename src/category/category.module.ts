import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { GuardsModule } from 'src/guards/guards.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [GuardsModule],
    exports: [CategoryService],
    providers: [CategoryService],
    controllers: [CategoryController],
})
export class CategoryModule {}
