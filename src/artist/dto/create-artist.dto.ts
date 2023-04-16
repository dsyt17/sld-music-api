import { IsNotEmpty, IsArray, IsString, ArrayMinSize } from 'class-validator';

export class CreateArtistDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  readonly releases: Array<string>;
}
