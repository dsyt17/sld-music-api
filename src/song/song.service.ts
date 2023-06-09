import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artist } from 'src/artist/schemas/artist.schema';
import { Release } from 'src/releases/schemas/release.schema';
import { ErrorMessageType } from 'src/types';

import { CreateSongDto } from './dto/create-song.dto';
import { Song, SongDocument } from './schemas/song.schema';

@Injectable()
export class SongService {
    constructor(@InjectModel(Song.name) private releaseModel: Model<SongDocument>) {}

    async getAll(): Promise<Song[]> {
        return this.releaseModel
            .find()
            .populate('release', 'title', Release.name)
            .populate('artists', 'nickName', Artist.name)
            .exec();
    }

    async getById(id: string): Promise<Song | ErrorMessageType> {
        let error;

        const doc = await this.releaseModel
            .findById(id)
            .populate('release', 'title', Release.name)
            .populate('artists', 'nickName', Artist.name)
            .catch(e => {
                error = true;
                return e;
            });

        if (error) {
            return {
                status: 'Error',
                message: `Can't find song: ${id}`,
            };
        }
        return doc;
    }

    async create(releaseDto: CreateSongDto): Promise<Song> {
        const newRelease = new this.releaseModel(releaseDto);
        return newRelease.save();
    }

    async remove(id: string): Promise<Song> {
        return this.releaseModel.findByIdAndRemove(id).exec();
    }

    async update(id: string, releaseDto: CreateSongDto): Promise<Song> {
        return this.releaseModel.findByIdAndUpdate(id, releaseDto, { new: true });
    }
}
