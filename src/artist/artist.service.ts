import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Release } from 'src/releases/schemas/release.schema';
import { Song } from 'src/song/schemas/song.schema';
import { ErrorMessageType } from 'src/types';

import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist, ArtistDocument } from './schemas/artist.schema';

@Injectable()
export class ArtistService {
    constructor(@InjectModel(Artist.name) private artistModel: Model<ArtistDocument>) {}

    async getAll(): Promise<Artist[]> {
        return this.artistModel
            .find()
            .populate('releases', 'title', Release.name)
            .populate('songs', 'title prod duration', Song.name)
            .catch(e => e);
    }

    async getById(id: string): Promise<Artist | ErrorMessageType> {
        let error;

        const doc = await this.artistModel
            .findById(id)
            .populate('releases', 'title', Release.name)
            .populate('songs', 'title prod duration', Song.name)
            .catch(e => {
                error = true;
                return e;
            });

        if (error) {
            return {
                status: 'Error',
                message: `Can't find artist: ${id}`,
            };
        }

        return doc;
    }

    async getByLink(link: string): Promise<Artist | ErrorMessageType> {
        const doc = await this.artistModel
            .findOne({ link })
            .populate({
                path: 'releases',
                select: 'title cover artists year link',
                model: 'Release',
                populate: {
                    path: 'artists',
                    select: 'nickName',
                    model: 'Artist',
                },
            })
            .populate('songs', 'title prod duration', Song.name);

        if (!doc) {
            return {
                status: 'Error',
                message: `Can't find artist: ${link}`,
            };
        }

        return doc;
    }

    async create(releaseDto: CreateArtistDto): Promise<Artist> {
        const newRelease = new this.artistModel(releaseDto);
        return newRelease.save();
    }

    async remove(id: string): Promise<Artist> {
        return this.artistModel.findByIdAndRemove(id).exec();
    }

    async update(id: string, releaseDto: CreateArtistDto): Promise<Artist> {
        return this.artistModel.findByIdAndUpdate(id, releaseDto, {
            new: true,
        });
    }
}
