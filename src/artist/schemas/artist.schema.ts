import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Release } from 'src/releases/schemas/release.schema';
import { Song } from 'src/song/schemas/song.schema';

export type ArtistDocument = Artist & Document;

@Schema()
export class Artist {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  nickName: string;

  @Prop({ required: true })
  birthDate: string;

  @Prop({ required: true })
  about: string;

  @Prop({ required: true, type: Array<Types.ObjectId>, ref: 'Release' })
  releases: Array<Release>;

  @Prop({ required: true, type: Array<Types.ObjectId>, ref: 'Song' })
  songs: Array<Song>;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
