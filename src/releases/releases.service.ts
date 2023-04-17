import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Artist } from 'src/artist/schemas/artist.schema';
import { Song } from 'src/song/schemas/song.schema';
import { ErrorMessageType } from 'src/types';

import { CreateReleaseDto } from './dto/create-release.dto';
import { Release, ReleaseDocument } from './schemas/release.schema';

@Injectable()
export class ReleasesService {
    constructor(
        @InjectModel(Release.name) private releaseModel: Model<ReleaseDocument>,
    ) {}

    async getAll(): Promise<Release[]> {
        return this.releaseModel
            .find()
            .populate('songs', 'title prod duration', Song.name)
            .populate('artists', 'nickName', Artist.name)
            .exec();
    }

    async getById(id: string): Promise<Release | ErrorMessageType> {
        let error;

        const doc = await this.releaseModel
            .findById(id)
            .populate('songs', 'title prod duration', Song.name)
            .populate('artists', 'nickName', Artist.name)
            .catch(e => {
                error = true;
                return e;
            });

        if (error) {
            return {
                status: 'Error',
                message: `Can't find release: ${id}`,
            };
        }
        return doc;
    }

    async create(releaseDto: CreateReleaseDto): Promise<Release> {
        const newRelease = new this.releaseModel(releaseDto);
        return newRelease.save();
    }

    async remove(id: string): Promise<Release> {
        return this.releaseModel.findByIdAndRemove(id).exec();
    }

    async update(id: string, releaseDto: CreateReleaseDto): Promise<Release> {
        return this.releaseModel.findByIdAndUpdate(id, releaseDto, { new: true });
    }
}
