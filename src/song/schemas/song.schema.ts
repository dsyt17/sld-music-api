import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Artist } from 'src/artist/schemas/artist.schema';
import { Release } from 'src/releases/schemas/release.schema';

export type SongDocument = Song & Document;

@Schema()
export class Song {
    @Prop({ required: true, type: Types.ObjectId, ref: Artist.name })
    artists: Array<Artist>;

    @Prop({ required: true })
    title: string;

    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: 'Release',
    })
    release: Release;

    @Prop()
    prod: string;

    @Prop({ required: true })
    duration: string;
}

export const SongSchema = SchemaFactory.createForClass(Song);
