import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Artist } from 'src/artist/schemas/artist.schema';
import { Song } from 'src/song/schemas/song.schema';

export type ReleaseDocument = Release & Document;

@Schema()
export class Release {
    @Prop({ required: true, type: Types.ObjectId, ref: Artist.name })
    artists: Array<Artist>;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    about: string;

    @Prop({ required: true })
    genre: string;

    @Prop({ required: true })
    year: number;

    @Prop({ required: true, type: Array<Types.ObjectId>, ref: Song.name })
    songs: Array<Song>;
}

export const ReleaseSchema = SchemaFactory.createForClass(Release);
