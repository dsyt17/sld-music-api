import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { Release, ReleaseSchema } from 'src/releases/schemas/release.schema';

import { Song, SongSchema } from './schemas/song.schema';
import { SongController } from './song.controller';
import { SongService } from './song.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Song.name, schema: SongSchema }])],
    providers: [SongService],
    controllers: [SongController],
})
export class SongModule {}
