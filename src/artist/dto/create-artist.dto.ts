import {
  IsNotEmpty,
  IsArray,
  IsString,
  ArrayMinSize,
  IsDate,
} from 'class-validator';

export class CreateArtistDto {
  @IsNotEmpty()
  @IsString()
  readonly fullName: string;

  @IsNotEmpty()
  @IsString()
  readonly nickName: string;

  @IsNotEmpty()
  @IsString()
  readonly birthDate: string;

  @IsNotEmpty()
  @IsString()
  readonly about: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  readonly releases: Array<string>;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  readonly songs: Array<string>;
}
