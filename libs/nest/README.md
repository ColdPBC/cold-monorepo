<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://cold-public-assets.s3.us-east-2.amazonaws.com/Asset+4Logotype_Preferred.svg" width="699" alt="Cold Climate Logo" /></a>
</p>
<hr>
<div> 
<span style="font-size: xx-large; color: #2980b9"><img style="vertical-align:middle" src='https://avatars.githubusercontent.com/u/28507035?s=48&v=4'/> Nest.js Shared Microservice Library</span>
</div>

### Description
This library contains shared code for the Cold Climate Nest.js microservices.  The library is intended to be used by services contained in the Cold Climate monorepo.  It is not intended to be used as a standalone library at this time.

### Getting Started
Though you may opt to import only the modules you need, it's eaiser and most of the time, a better idea to import them all in one go.  

To make sure you have all modules available in your Nest.js microservice, simply add the NestModule to the imports array of your service's AppModule.

```typescript
import { Module } from '@nestjs/common';
import { NestModule } from '@coldpbc/nest';

@Module({
  imports: [
    NestModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
```

### Enhancers
The following enhancers are available in this library:
- **Modules**
  - **PrismaModule** : 
  This module provides a PrismaClient instance to your service.  It also provides a PrismaService which can be injected into your service's providers and provides a few helper methods for common database operations.
  
  - **CacheModule** : 
  This module provides a RedisClient instance to your service.  It also provides a CacheService which can be injected into your service's providers and provides a few helper methods for common cache operations.

  - **AuthModule** :
  This module provides a few helper methods for common Auth0 token operations in order to help you add user authentication to your service.
  
  - **DarklyModule** : 
  This module provides a few helper methods for common LaunchDarkly operations in order to help you manage feature flags.
  
  - **CronModule** : 
  This module provides a few helper methods for common cron operations which help you schedule tasks to run at specific times.
  
  - **HealthModule** : 
  This module provides health check endpoint which help you monitor the health of your service.

- **Redactor**: 
This enhancer is used to redact sensitive information from logs.
- **WorkerLogger**:
This enhancer is used to provide a common logger that is consistent across all services.  The logger includes the Redactor service by default.
- **BaseWorker**: 
This enhancer is used to provide a common base class for all workers.  It includes the WorkerLogger and DD Tracer by default.  It also handles enriching the logs with values requried by DataDog.
- **HttpExceptionFilter**: 
This enhancer is used to provide a common exception filter for all services.  It includes the WorkerLogger by default.
- **Decorators**
  - **PermissionsDecorator**: 
  This decorator is used to define the permissions required to access a route.  It is used in conjunction with the AuthModule.
  - **PublicDecorator**: 
  This decorator is used to define a route as public.  It is used in conjunction with the AuthModule.
  - **RolesDecorator**: 
  This decorator is used to define the roles required to access a route.  It is used in conjunction with the AuthModule.
- **Guards**
  - **JwtAuthGuard**: 
  This guard is used to protect routes that require a valid JWT token.  It is used in conjunction with the AuthModule.
  - **PermissionsGuard**: 
  This guard is used to protect routes that require specific permissions.  It is used in conjunction with the AuthModule.
  - **RolesGuard**: 
  This guard is used to protect routes that require specific roles.  It is used in conjunction with the AuthModule.
- **Interceptors**
  - **LoggingInterceptor**: 
  This interceptor is used to automatically log the request and response of a route.
  - **TransformInterceptor**
  This interceptor is used to automatically transform the response of a route.


### Environment Variables
Some of the modules contained in this library require certain environment variables to be set in order to function properly.  They should be stored in your IDE (Webstorm) or in a .env file in the root directory of your service.

```dotenv
# Cache Module
REDIS_CLOUD_URL=redis://localhost:6379

# Authorization Module
AUTH0_AUDIENCE=https://api.coldclimate.online/
AUTH0_CLIENT_ID=UG9T########HQFI
AUTH0_CLIENT_SECRET=6r7D_6i########LoaIYb_
AUTH0_DOMAIN=cold-climate-staging.us.auth0.com

# Darkly Module
DARKLY_SDK_KEY=sdk-########-####-####-####-############

# Prisma Module
DATABASE_URL="postgres://CC_admin:EPSILON-desti########y1d.us-east-1.rds.amazonaws.com/cold_climate"
```
### Running unit tests

Run `nx test nest` to execute the unit tests via [Jest](https://jestjs.io).


This library was generated with [Nx](https://nx.dev)
