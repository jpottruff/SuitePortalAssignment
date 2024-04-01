import { Injectable } from '@nestjs/common';
import { LoginRequest } from '@suiteportal/api-interfaces';

@Injectable()
export class UserService {
  /** STUB authentication function - obviously not realistic */
  authenticate(request: LoginRequest) {
    const isAuthenticated =
      request.username === 'admin' && request.password === 'admin';
    return { isAuthenticated };
  }
}
