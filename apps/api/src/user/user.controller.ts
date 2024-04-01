import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginRequest, LoginResponse } from '@suiteportal/api-interfaces';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
    //
  }
  @Post('/login')
  public async login(
    @Body() loginRequest: LoginRequest
  ): Promise<LoginResponse> {
    if (!loginRequest?.username) {
      throw new BadRequestException('No username provided');
    }
    if (!loginRequest?.password) {
      throw new BadRequestException('No password provided');
    }

    return this.userService.authenticate(loginRequest);
  }
}
