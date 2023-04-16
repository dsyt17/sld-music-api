import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SongService } from './song.service';
import { Song } from './schemas/song.schema';
import { CreateSongDto } from './dto/create-song.dto';

@Controller('song')
export class SongController {
  constructor(private readonly songServise: SongService) {}

  @Get()
  getAll(): Promise<Song[]> {
    return this.songServise.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Song> {
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
  update(
    @Body() updateReleaseDto: CreateSongDto,
    @Param('id') id,
  ): Promise<Song> {
    return this.songServise.update(id, updateReleaseDto);
  }
}
