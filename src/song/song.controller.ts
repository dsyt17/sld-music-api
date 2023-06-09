import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { ErrorMessageType } from 'src/types';

import { CreateSongDto } from './dto/create-song.dto';
import { Song } from './schemas/song.schema';
import { SongService } from './song.service';

@Controller('song')
export class SongController {
    constructor(private readonly songServise: SongService) {}

    @Get()
    getAll(): Promise<Song[]> {
        return this.songServise.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<Song | ErrorMessageType> {
        return this.songServise.getById(id);
    }

    @Post()
    create(@Body() createReleaseDto: CreateSongDto): Promise<Song> {
        return this.songServise.create(createReleaseDto);
    }

    @Delete(':id')
    remove(@Param('id') id): Promise<Song> {
        return this.songServise.remove(id);
    }

    @Put(':id')
    update(@Body() updateReleaseDto: CreateSongDto, @Param('id') id): Promise<Song> {
        return this.songServise.update(id, updateReleaseDto);
    }
}
