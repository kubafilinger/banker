import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import { ApiTags } from '@nestjs/swagger';

@Controller('/logs')
export class LogsController {
  @ApiTags('logs')
  @Get()
  async logs(@Res() res: Response) {
    try {
      const buffer = await fs.readFileSync(
        `${__dirname}/../../../logs/error.log`,
      );
      if (!buffer.length) {
        throw new Error('No log file!');
      }
      return res.status(HttpStatus.OK).send(buffer.toString());
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: {
          message: e.message,
        },
      });
    }
  }
}
