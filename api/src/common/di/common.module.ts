import { Module } from '@nestjs/common'
import { HealthcheckController } from '../application/healthcheck/healthcheck.controller'
import { GlobalExceptionFilter } from '../application/rest/filters/global.filter'
import { ErrorResponseFactory } from '../application/rest/responses/error-response.factory'
import { RestExceptionHandler } from '../application/rest/services/rest-exception-handler.service'
import { HostMiddleware } from '../application/rest/middlewares/host.middleware'
import { CONFIGURATION } from '../../configuration/di/configuration.tokens'
import { ConfigurationModule } from '../../configuration/di/configuration.module'
import { Configuration } from '../../configuration/configuration'
import { SecurityHeadersMiddleware } from '../application/rest/middlewares/csp.middleware'
import { DOCS_PATH } from '../application/rest/openapi/helpers'

@Module({
    exports: [RestExceptionHandler, HostMiddleware, SecurityHeadersMiddleware],
    imports: [ConfigurationModule],
    providers: [
        GlobalExceptionFilter, 
        RestExceptionHandler, 
        ErrorResponseFactory,
        {
            provide: HostMiddleware,
            useFactory: (config: Configuration) => new HostMiddleware(config.http.allowedHosts),
            inject: [CONFIGURATION]
        },
        {
            provide: SecurityHeadersMiddleware,
            useFactory: (config: Configuration) => new SecurityHeadersMiddleware([
                ...(config.http.openapi.expose ? [DOCS_PATH] : [])
            ]),
            inject: [CONFIGURATION]
        }
    ],
    controllers: [HealthcheckController]
})
export class CommonModule {}