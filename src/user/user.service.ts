import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateUserDto): Promise<GetUserDto> {
        const salt = await bcrypt.genSalt();
        data.password = await bcrypt.hash(data.password, salt);
        return this.prisma.user.create({
            data,
            select: {
                id: true,
                email: true,
                username: true,
                createdAt: true,
                role: true,
                preferences: true,
            },
        });
    }

    async findAll(): Promise<GetUserDto[]> {
        return this.prisma.user.findMany({
            select: {
                id: true,
                email: true,
                username: true,
                createdAt: true,
                updatedAt: true,
                role: true,
            },
        });
    }

    async findOne(id: string): Promise<GetUserDto> {
        if (!(await this.prisma.user.findUnique({ where: { id } }))) {
            throw new NotFoundException(`User not found`);
        }

        return this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                username: true,
                createdAt: true,
                updatedAt: true,
                role: true,
            },
        });
    }

    async update(
        id: string,
        updateUserDto: UpdateUserDto,
    ): Promise<GetUserDto> {
        if (!(await this.prisma.user.findUnique({ where: { id } }))) {
            throw new NotFoundException(`User not found`);
        }

        const salt = await bcrypt.genSalt();
        updateUserDto.password = await bcrypt.hash(
            updateUserDto.password,
            salt,
        );
        return this.prisma.user.update({
            where: { id },
            data: { ...updateUserDto, updatedAt: new Date() },
            select: {
                id: true,
                email: true,
                username: true,
                createdAt: true,
                updatedAt: true,
                role: true,
                preferences: true,
            },
        });
    }

    async remove(id: string): Promise<GetUserDto> {
        if (!(await this.findOne(id))) {
            throw new NotFoundException(`User not found`);
        }

        return this.prisma.user.delete({
            where: { id },
            select: {
                id: true,
                email: true,
                username: true,
                createdAt: true,
                updatedAt: true,
                role: true,
            },
        });
    }
}
