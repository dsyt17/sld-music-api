import { Controller, Get, Param, Res } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return 'Hella Players';
    }

    @Get('assets/:filename')
    async getFile(@Param('filename') filename: string, @Res() res: any) {
        res.sendFile(filename, { root: 'assets' });
    }
}
