import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { ErrorMessageType } from 'src/types';

import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './schemas/artist.schema';

@Controller('artist')
export class ArtistController {
    constructor(private readonly artistServise: ArtistService) {}

    @Get()
    getAll(): Promise<Artist[]> {
        return this.artistServise.getAll();
    }

    @Get('all')
    getAllArtistNames(): Promise<Artist[]> {
        return this.artistServise.getAllArtistNames();
    }

    // @Get(':id')
    // getOne(@Param('id') id: string): Promise<Artist | ErrorMessageType> {
    //     return this.songServise.getById(id);
    // }

    @Get(':link')
    getOneByLink(@Param('link') link: string): Promise<Artist | ErrorMessageType> {
        return this.artistServise.getByLink(link);
    }

    @Post()
    create(@Body() createReleaseDto: CreateArtistDto): Promise<Artist> {
        return this.artistServise.create(createReleaseDto);
    }

    @Delete(':id')
    remove(@Param('id') id): Promise<Artist> {
        return this.artistServise.remove(id);
    }

    @Put(':id')
    update(@Body() updateReleaseDto: CreateArtistDto, @Param('id') id): Promise<Artist> {
        return this.artistServise.update(id, updateReleaseDto);
    }
}
