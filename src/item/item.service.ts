import { CreateItemDto } from './dto/create-item.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateItemDto } from './dto/update-item.dto';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ItemService {
    constructor(
        private prisma: PrismaService,
        private categoryService: CategoryService,
    ) {}

    async findAll() {
        return this.prisma.item.findMany();
    }

    async findAllByUser(userId: string) {
        return this.prisma.item.findMany({
            where: {
                userId: {
                    in: [userId],
                },
            },
            select: {
                id: true,
                category: true,
                name: true,
                price: true,
                unity: true,
                userId: true,
            },
        });
    }

    async createItem(userId: string, data: CreateItemDto) {
        if (data.categoryName) {
            const newCat = this.categoryService.createCategory(userId, {
                name: data.categoryName,
            });

            data.categoryId = (await newCat).id;
        }

        if (data.categoryId) {
            const categories = this.categoryService.findAllByUser(userId);
            (await categories).map((category) => {
                if (category.id === data.categoryId) {
                    data.categoryId = category.id;
                }
            });
        }

        if (data.categoryName) {
            delete data.categoryName;
        }

        return this.prisma.item.create({
            data: {
                ...data,
                userId,
            },
        });
    }

    async updateItem(userId: string, itemId: string, data: UpdateItemDto) {
        if (data.categoryName) {
            const newCat = this.prisma.category.create({
                data: {
                    name: data.categoryName,
                    userId,
                },
            });

            data.categoryId = (await newCat).id;
        }

        if (data.categoryName) {
            delete data.categoryName;
        }

        return this.prisma.item.update({
            data,
            where: {
                id: itemId,
            },
        });
    }

    async deleteItem(id: string) {
        return this.prisma.item.delete({
            where: {
                id,
            },
        });
    }

    async deleteAllUserItems(userId: string) {
        return this.prisma.item.deleteMany({
            where: {
                userId,
            },
        });
    }
}
