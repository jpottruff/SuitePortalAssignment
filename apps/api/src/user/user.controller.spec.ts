import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { LoginRequest } from '@suiteportal/api-interfaces';

const MOCK_USER_SERVICE: Partial<UserService> = {
  authenticate: jest.fn(),
};

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: MOCK_USER_SERVICE }],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login()', () => {
    it('should call the user service to authenticate the user', () => {
      const mockRequest: LoginRequest = {
        username: 'test',
        password: 'fake',
      };
      const functionSpy = jest
        .spyOn(MOCK_USER_SERVICE, 'authenticate')
        .mockReturnValue({ isAuthenticated: true, token: '111' });
      controller.login(mockRequest);
      expect(functionSpy).toHaveBeenCalledWith(mockRequest);
    });

    it('should throw an error if there is no username', async () => {
      const mockBadRequest = { password: 'fake' };

      try {
        await controller.login(mockBadRequest as any);
      } catch (err) {
        expect(err).toBeDefined();
      }
    });

    it('should throw an error if there is no password', async () => {
      const mockBadRequest = { username: 'fake' };

      try {
        await controller.login(mockBadRequest as any);
      } catch (err) {
        expect(err).toBeDefined();
      }
    });
  });
});
