import { CreateItemDto } from './dto/create-item.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return this.prisma.item.findMany();
    }

    async findAllByUser(userId: string) {
        return this.prisma.item.findMany({
            where: {
                userId,
            },
        });
    }

    async createItem(data: CreateItemDto) {
        return this.prisma.item.create({
            data,
        });
    }

    async updateItem(id: string, data: UpdateItemDto) {
        return this.prisma.item.update({
            data,
            where: {
                id,
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
}
