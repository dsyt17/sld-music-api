import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SongDocument = Song & Document;

@Schema()
export class Song {
  @Prop({ required: true })
  artists: Array<string>;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  release: string;

  @Prop()
  prod: string;

  @Prop({ required: true })
  duration: string;
}

export const SongSchema = SchemaFactory.createForClass(Song);
