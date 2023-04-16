import { Module } from '@nestjs/common';
import { ReleasesService } from './releases.service';
import { ReleasesController } from './releases.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Release, ReleaseSchema } from './schemas/release.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Release.name, schema: ReleaseSchema }]),
  ],
  providers: [ReleasesService],
  controllers: [ReleasesController],
})
export class ReleasesModule {}
