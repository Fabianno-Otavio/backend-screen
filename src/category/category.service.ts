import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) {}

    async findAllByUser(userId: string) {
        return this.prisma.category.findMany({
            where: {
                userId,
            },
        });
    }

    async createCategory(userId: string, data: CreateCategoryDto) {
        return this.prisma.category.create({
            data: {
                ...data,
                userId,
            },
        });
    }
}
