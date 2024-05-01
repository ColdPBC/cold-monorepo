<p><a target="_blank" href="https://app.eraser.io/workspace/CzeWUNz6DAOtIieYA2FN" id="edit-in-eraser-github-link"><img alt="Edit in Eraser" src="https://firebasestorage.googleapis.com/v0/b/second-petal-295822.appspot.com/o/images%2Fgithub%2FOpen%20in%20Eraser.svg?alt=media&amp;token=968381c8-a7e7-472a-8ed6-4a6626da5501"></a></p>

---

![](https://avatars.githubusercontent.com/u/28507035?s=48&v=4 "")

 Nest.js Shared Microservice Library

### Description
This library contains shared code for the Cold Climate Nest.js microservices. The library is intended to be used by services contained in the Cold Climate monorepo. It is not intended to be used as a standalone library at this time.

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
    - **Authorization** :
This module provides a few helper methods for common Auth0 token operations in order to help you add user authentication to your service.
        - **JwtAuth**: This guard is used to protect routes that require a valid JWT token. It is used in conjunction with the AuthModule.
        - **Permissions**:
This guard is used to protect routes that require specific permissions. It is used in conjunction with the AuthModule.
        - **Roles**:
This guard is used to protect routes that require specific roles. It is used in conjunction with the AuthModule.
        - **Auth0 Token Service**: 
        - **Refresh Token Strategy**:
        - **AccessToken Strategy**:
    - **AWS**: This top level module contains sub-modules that provide access to various AWS services.
    - **S3** : For accessing files 
    - **Secrets** : For accessing secrets in secrets manager
    - **MQTT**: This module provides the ability to publish and subscribe to MQTT topics hosted on the MQTT Broker (AWS IOT Core).
    - **PrismaModule** : This module provides a PrismaClient instance to your service. It also provides a PrismaService which can be injected into your service's providers and provides a few helper methods for common database operations.
    - **CacheModule** :
This module provides a RedisClient instance to your service. It also provides a CacheService which can be injected into your service's providers and provides a few helper methods for common cache operations.
    - **DarklyModule** :
This module provides a few helper methods for common LaunchDarkly operations in order to help you manage feature flags.
    - **CronModule** :
This module provides a few helper methods for common cron operations which help you schedule tasks to run at specific times.
    - **HealthModule** :
This module provides health check endpoint which help you monitor the health of your service.
- **Redactor**:
This enhancer is used to redact sensitive information from logs.
- **WorkerLogger**:
This enhancer is used to provide a common logger that is consistent across all services. The logger includes the Redactor service by default.
- **BaseWorker**:
This enhancer is used to provide a common base class for all workers. It includes the WorkerLogger and DD Tracer by default. It also handles enriching the logs with values requried by DataDog.
- **HttpExceptionFilter**:
This enhancer is used to provide a common exception filter for all services. It includes the WorkerLogger by default.
- **Decorators**
    - **PermissionsDecorator**:
This decorator is used to define the permissions required to access a route. It is used in conjunction with the AuthModule.
    - **PublicDecorator**:
This decorator is used to define a route as public. It is used in conjunction with the AuthModule.
    - **RolesDecorator**:
This decorator is used to define the roles required to access a route. It is used in conjunction with the AuthModule.
- **Interceptors**
    - **LoggingInterceptor**:
This interceptor is used to automatically log the request and response of a route.
    - **TransformInterceptor**
This interceptor is used to automatically transform the response of a route.
### Environment Variables
The following environment variables are required by this library:

- **NODE_ENV** : 'development' | 'staging' | 'production'
- **DD_SERVICE** : The name of the service (ie: cold-platform-openai)
Optional:

- **PORT**: This is technically optional, but recommended to avoid port collisions when running multiple services
- **LOG_FORMAT**: Setting this value will print console logs in a human readable format
### Running unit tests
Run `nx test nest` to execute the unit tests via [﻿Jest](https://jestjs.io/).

This library was generated with [﻿Nx](https://nx.dev/) 



New Compliance Model

![Compliance Model](/.eraser/CzeWUNz6DAOtIieYA2FN___GrwOoj6dUzMlRteWLWVhtaKTBL12___---figure---uVtaW1jVIMVmwwZgjE7XM---figure---lWQ-c1aJ_Gw-1wnpOFfkfQ.png "Compliance Model")





<!--- Eraser file: https://app.eraser.io/workspace/CzeWUNz6DAOtIieYA2FN --->