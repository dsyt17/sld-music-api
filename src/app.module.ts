import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artist/artist.module';
import { ReleasesModule } from './releases/releases.module';
import { SongModule } from './song/song.module';

@Module({
    imports: [
        ReleasesModule,
        MongooseModule.forRoot('mongodb://0.0.0.0:27017/sld-music'),
        SongModule,
        ArtistModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
