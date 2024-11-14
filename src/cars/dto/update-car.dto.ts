import { IsOptional, IsString, IsUUID, MinLength } from "class-validator";

export class UpdateCarDto {

    @IsUUID()
    @IsString()
    @IsOptional()
    id?: string;

    @IsString({ message: 'The brand most be cool string' })
    @IsOptional()
    readonly brand?: string;

    @IsString()
    @MinLength(3)
    @IsOptional()
    readonly model?: string;
}   