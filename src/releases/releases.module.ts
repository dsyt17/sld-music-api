import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { Song, SongSchema } from 'src/song/schemas/song.schema';

import { ReleasesController } from './releases.controller';
import { ReleasesService } from './releases.service';

import { Release, ReleaseSchema } from './schemas/release.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Release.name, schema: ReleaseSchema }])],
    providers: [ReleasesService],
    controllers: [ReleasesController],
})
export class ReleasesModule {}
