import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReleasesModule } from './releases/releases.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SongModule } from './song/song.module';
import { ArtistModule } from './artist/artist.module';

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
