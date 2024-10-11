import { InjectionToken } from '@angular/core'

export const BACKEND_URL_SUPPLIER = new InjectionToken<() => URL>('backend URL')