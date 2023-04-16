import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Artist, ArtistDocument } from './schemas/artist.schema';
import { Model } from 'mongoose';
import { CreateArtistDto } from './dto/create-artist.dto';

@Injectable()
export class ArtistService {
  constructor(
    @InjectModel(Artist.name) private releaseModel: Model<ArtistDocument>,
  ) {}

  async getAll(): Promise<Artist[]> {
    return this.releaseModel.find().exec();
  }

  async getById(id: string): Promise<Artist> {
    return this.releaseModel.findById(id);
  }

  async create(releaseDto: CreateArtistDto): Promise<Artist> {
    const newRelease = new this.releaseModel(releaseDto);
    return newRelease.save();
  }

  async remove(id: string): Promise<Artist> {
    return this.releaseModel.findByIdAndRemove(id).exec();
  }

  async update(id: string, releaseDto: CreateArtistDto): Promise<Artist> {
    return this.releaseModel.findByIdAndUpdate(id, releaseDto, { new: true });
  }
}
