import { IsNotEmpty, IsInt, IsArray, IsString, ArrayMinSize } from 'class-validator';

export class CreateReleaseDto {
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly genre: string;

    @IsNotEmpty()
    @IsString()
    readonly about: string;

    @IsNotEmpty()
    @IsInt()
    readonly year: number;

    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    readonly artists: Array<string>;
}
