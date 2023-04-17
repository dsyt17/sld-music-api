import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

import { Artist, ArtistSchema } from './schemas/artist.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }])],
    providers: [ArtistService],
    controllers: [ArtistController],
})
export class ArtistModule {}
