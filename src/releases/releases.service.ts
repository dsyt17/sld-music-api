import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Release, ReleaseDocument } from './schemas/release.schema';
import { Model } from 'mongoose';
import { CreateReleaseDto } from './dto/create-release.dto';

@Injectable()
export class ReleasesService {
  constructor(
    @InjectModel(Release.name) private releaseModel: Model<ReleaseDocument>,
  ) {}

  async getAll(): Promise<Release[]> {
    return this.releaseModel.find().exec();
  }

  async getById(id: string): Promise<Release> {
    return this.releaseModel.findById(id);
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
