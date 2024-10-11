import { BehaviorSubject, Observable } from 'rxjs'
import { Page } from '../../common/models/page'
import { User } from '../models/user'
import { UsersRestService } from '../services/users-rest.service'
import { Injectable } from '@angular/core'
import { ApiErrorResponse } from '../../common/errors/api-error'
import { HttpStatusCode } from '@angular/common/http'

export type AddUserParams = Readonly<{
    firstname: string
    lastname: string
}>

export type State =
    | Readonly<{
        step: 'waiting'
    }>
    | Readonly<{
        step: 'adding',
        params: AddUserParams
    }>
    | Readonly<{
        step: 'success',
        user: User
    }>
    | Readonly<{
        step: 'error',
        error: 'already-exists' | Error
    }>

@Injectable({
    providedIn: 'root'
})
export class AddUserStore {

    constructor(private readonly usersRestService: UsersRestService) { }

    private readonly state$ = new BehaviorSubject<State>({
        step: 'waiting'
    })

    state(): Observable<State> {
        return this.state$.asObservable()
    }

    add(params: AddUserParams): void {
        this.state$.next({
            step: 'adding',
            params
        })
        this.usersRestService.add(params.firstname, params.lastname)
            .subscribe({
                next: user => {
                    this.state$.next({
                        step: 'success',
                        user
                    })
                },
                error: error => {
                    if (error instanceof ApiErrorResponse && error.status === HttpStatusCode.Conflict)
                        this.state$.next({
                            step: 'error',
                            error: 'already-exists'
                        })
                    else
                        this.state$.next({
                            step: 'error',
                            error
                        })
                }
            })
    }
}