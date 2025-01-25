import { HttpStatus } from '@nestjs/common';

export type RespMessage = {
  statusCode: HttpStatus;
  message: string;
};
