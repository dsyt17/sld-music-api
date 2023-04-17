import { IsNotEmpty, IsArray, IsString, ArrayMinSize } from 'class-validator';

export class CreateSongDto {
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly prod: string;

    @IsNotEmpty()
    @IsString()
    readonly duration: string;

    //   @IsNotEmpty()
    //   @IsString()
    //   readonly release: string;

    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    readonly artists: Array<string>;
}
