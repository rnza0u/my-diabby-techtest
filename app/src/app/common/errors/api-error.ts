import { HttpStatusCode } from '@angular/common/http'

export class ApiErrorResponse {
    constructor(readonly status: HttpStatusCode, readonly message: string){}
}