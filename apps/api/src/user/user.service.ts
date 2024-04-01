import { Injectable } from '@nestjs/common';
import { LoginRequest, LoginResponse } from '@suiteportal/api-interfaces';

@Injectable()
export class UserService {
  /** STUB authentication function - obviously not realistic */
  authenticate(request: LoginRequest): LoginResponse {
    // * Verify password
    const isAuthenticated =
      request.username === 'admin' && request.password === 'admin';

    // * Create token
    let token;
    if (isAuthenticated) {
      const STUB_TOKEN = 'STUB TOKEN';
      token = STUB_TOKEN;
    }

    return { isAuthenticated, token };
  }
}
