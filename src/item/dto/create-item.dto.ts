import { IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateItemDto {
    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsOptional()
    @IsString()
    unity: string;

    @IsOptional()
    @IsMongoId()
    categoryId: string;

    @IsOptional()
    @IsString()
    categoryName: string;
}
