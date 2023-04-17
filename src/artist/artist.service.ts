import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Artist, ArtistDocument } from './schemas/artist.schema';
import { Model } from 'mongoose';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Song } from 'src/song/schemas/song.schema';
import { Release } from 'src/releases/schemas/release.schema';

type ArtistResponseType = {
  _id: string;
  fullName: string;
  nickName: string;
  birthDate: string;
  about: string;
  releases: Array<{
    _id: string;
    title: string;
  }>;
  songs: Array<{
    _id: string;
    title: string;
  }>;
};

@Injectable()
export class ArtistService {
  constructor(
    @InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
  ) {}

  async getAll(): Promise<Artist[]> {
    return this.artistModel
      .find()
      .populate('releases', null, Release.name)
      .populate('songs', null, Song.name)
      .catch((e) => e);
  }

  async getById(id: string): Promise<any> {
    let error;

    const doc = await this.artistModel
      .findById(id)
      .populate('releases', 'title', Release.name)
      .populate('songs', 'title prod duration', Song.name)
      .catch((e) => {
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

  async create(releaseDto: CreateArtistDto): Promise<Artist> {
    const newRelease = new this.artistModel(releaseDto);
    return newRelease.save();
  }

  async remove(id: string): Promise<Artist> {
    return this.artistModel.findByIdAndRemove(id).exec();
  }

  async update(id: string, releaseDto: CreateArtistDto): Promise<Artist> {
    return this.artistModel.findByIdAndUpdate(id, releaseDto, { new: true });
  }
}
