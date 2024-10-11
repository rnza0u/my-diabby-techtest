import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http'
import { catchError, map, Observable, throwError } from 'rxjs'
import { ApiErrorResponse } from '../errors/api-error'
import { inject } from '@angular/core'
import { BACKEND_URL_SUPPLIER } from '../../app.tokens'

export function apiErrorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

    const backendUrl = inject(BACKEND_URL_SUPPLIER)()
    const requestUrl = new URL(req.url)

    if (requestUrl.origin !== backendUrl.origin)
        return next(req)

    return next(req).pipe(
        catchError(err => {

            if (!(err instanceof HttpErrorResponse))
                return throwError(() => err)

            if (err.error instanceof Error)
                return throwError(() => err)

            return throwError(() => new ApiErrorResponse(err.status, err['message']))
        })
    )
}