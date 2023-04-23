import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { ErrorMessageType } from 'src/types';

import { CreateReleaseDto } from './dto/create-release.dto';
import { ReleasesService } from './releases.service';
import { Release } from './schemas/release.schema';

@Controller('releases')
export class ReleasesController {
    constructor(private readonly releaseServise: ReleasesService) {}

    @Get()
    getAll(): Promise<Release[]> {
        return this.releaseServise.getAll();
    }

    // @Get(':id')
    // getOne(@Param('id') id: string): Promise<Release | ErrorMessageType> {
    //     return this.releaseServise.getById(id);
    // }

    @Get(':link')
    getOneByLink(@Param('link') link: string): Promise<Release | ErrorMessageType> {
        return this.releaseServise.getByLink(link);
    }

    @Post()
    create(@Body() createReleaseDto: CreateReleaseDto): Promise<Release> {
        return this.releaseServise.create(createReleaseDto);
    }

    @Delete(':id')
    remove(@Param('id') id): Promise<Release> {
        return this.releaseServise.remove(id);
    }

    @Put(':id')
    update(
        @Body() updateReleaseDto: CreateReleaseDto,
        @Param('id') id,
    ): Promise<Release> {
        return this.releaseServise.update(id, updateReleaseDto);
    }
}
