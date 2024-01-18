import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CategoryService } from './category.service';

@UseGuards(AuthGuard)
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}
    @Get(':id')
    getCategoryByUser(@Param('id') userId: string) {
        return this.categoryService.findAllByUser(userId);
    }
}
