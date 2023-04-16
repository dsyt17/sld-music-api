import { Injectable } from '@nestjs/common';
import { Song, SongDocument } from './schemas/song.schema';
import { CreateSongDto } from './dto/create-song.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SongService {
  constructor(
    @InjectModel(Song.name) private releaseModel: Model<SongDocument>,
  ) {}

  async getAll(): Promise<Song[]> {
    return this.releaseModel.find().exec();
  }

  async getById(id: string): Promise<Song> {
    return this.releaseModel.findById(id);
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
