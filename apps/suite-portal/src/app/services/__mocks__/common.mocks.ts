import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export const MOCK_HTTP_CLIENT: Partial<HttpClient> = {
  post: jest.fn(),
  get: jest.fn(),
  put: jest.fn(),
};

export const MOCK_ROUTER: Partial<Router> = {
  navigate: jest.fn(),
};
