import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Span, TraceService } from 'nestjs-ddtrace';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { JwtService } from '@nestjs/jwt';
import { WorkerLogger } from '../worker';
import { ConfigService } from '@nestjs/config';

@Span()
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  logger: WorkerLogger;
  private tracer: TraceService = new TraceService();

  constructor(private config: ConfigService, private readonly jwtService: JwtService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${config.get<string>('AUTH0_DOMAIN')}/.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() || ExtractJwt.fromUrlQueryParameter('access_token'),
      audience: config.get<string>('AUTH0_AUDIENCE'),
      issuer: `https://${config.get<string>('AUTH0_DOMAIN')}/`,
      algorithms: ['RS256'],
    });

    this.logger = new WorkerLogger('JwtStrategy');
  }

  async validate(payload: any): Promise<unknown> {
    if (!payload.aud.includes(this.config.get<string>('AUTH0_AUDIENCE'))) {
      return new UnauthorizedException('Invalid audience', payload);
    }

    // this.decode(payload.headers);
    return payload;
  }

  decode(header: Headers): unknown {
    const token = header.get('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }
    const decoded = this.jwtService.decode(token);
    // todo: this should actually be the user id / email, not org_id
    if (decoded != null) {
      this.tracer.getTracer().appsec.setUser({ id: decoded['org_id'], email: decoded['org_id'] });
    }

    this.logger.info('decoded token', { decoded });

    return decoded;
  }
}
