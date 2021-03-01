import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { OperationDto } from '../../application/dtos/operation.dto';

@Controller('/operation')
export class BankController {
  @Post('')
  operation(@Res() res: Response, @Body() operationDto: OperationDto) {
    try {
      return res.status(204).json(operationDto);
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: {
          message: e.message,
        },
      });
    }
  }
}
