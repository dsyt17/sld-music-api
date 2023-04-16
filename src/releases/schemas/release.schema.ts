import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReleaseDocument = Release & Document;

@Schema()
export class Release {
  @Prop({ required: true })
  artists: Array<string>;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  genre: string;

  @Prop({ required: true })
  year: number;
}

export const ReleaseSchema = SchemaFactory.createForClass(Release);
