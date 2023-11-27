import { Test } from '@nestjs/testing';
import { MemberService } from './member.service';
import { HttpService } from '@nestjs/axios';
import { Auth0UtilityService } from '../auth0.utility.service';
import { CacheService, AuthorizationModule, DarklyService } from '@coldpbc/nest';
import { mockDeep } from 'jest-mock-extended';
import { JwtService } from '@nestjs/jwt';
import { createMock, DeepMocked, PartialFuncReturn } from '@golevelup/ts-jest';

describe('Auth0MemberService', () => {
  let memberService: MemberService;
  let httpService: DeepMocked<HttpService>;
  const user = {
    email_verified: false,
    given_name: 'test',
    picture: 'https://www.google.com',
    password: 'test',
    blocked: false,
    name: 'test user',
    nickname: 'test user',
    connection: 'Auth0DB',
    family_name: 'user',
    verify_email: false,
    email: 'test@user.com',
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MemberService,
        Auth0UtilityService,
        CacheService,
        DarklyService,
        {
          provide: HttpService,
          useValue: createMock<HttpService>(),
        },
      ],
    })
      .overrideProvider(Auth0UtilityService)
      .useValue(mockDeep<Auth0UtilityService>())
      .overrideProvider(DarklyService)
      .useValue(mockDeep<DarklyService>())
      .overrideProvider(CacheService)
      .useValue(
        mockDeep<CacheService>({
          fallbackMockImplementation: jest.fn().mockReturnValue({
            get: jest.fn().mockReturnValue([
              {
                user_id: 'auth0|1234',
                email: 'test@test.com',
              },
            ]),
            set: jest.fn().mockReturnValue({
              user_id: 'auth0|1234',
              email: 'test@test.com',
            }),
            delete: jest.fn().mockReturnValue(null),
            reset: jest.fn().mockReturnValue(null),
          }),
        }),
      )
      .overrideProvider(JwtService)
      .useValue(mockDeep<JwtService>())
      .compile();

    httpService = module.get(HttpService);
    memberService = module.get(MemberService);
  });

  it('should be defined', () => {
    expect(memberService).toBeDefined();
  });
});
