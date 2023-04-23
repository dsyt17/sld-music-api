import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { ErrorMessageType } from 'src/types';

import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './schemas/artist.schema';

@Controller('artist')
export class ArtistController {
    constructor(private readonly songServise: ArtistService) {}

    @Get()
    getAll(): Promise<Artist[]> {
        return this.songServise.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<Artist | ErrorMessageType> {
        return this.songServise.getById(id);
    }

    @Post()
    create(@Body() createReleaseDto: CreateArtistDto): Promise<Artist> {
        return this.songServise.create(createReleaseDto);
    }

    @Delete(':id')
    remove(@Param('id') id): Promise<Artist> {
        return this.songServise.remove(id);
    }

    @Put(':id')
    update(@Body() updateReleaseDto: CreateArtistDto, @Param('id') id): Promise<Artist> {
        return this.songServise.update(id, updateReleaseDto);
    }
}
