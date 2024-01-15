import { IsMongoId, IsNumber, IsString } from 'class-validator';

export class CreateItemDto {
    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsString()
    unity: string;

    @IsMongoId()
    categoryId: string;

    @IsMongoId()
    userId: string;
}
