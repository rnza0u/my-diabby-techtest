import { BehaviorSubject, Observable } from 'rxjs'
import { Page } from '../../common/models/page'
import { User } from '../models/user'
import { Injectable } from '@angular/core'
import { UsersRestService } from '../services/users-rest.service'

export type LoadParams = Readonly<{
    page?: number
    itemsPerPage?: number
}>

export type ParamsState = Readonly<{
    currentPage: number
    itemsPerPage: number
}>

export type PageState = 
    |Readonly<{
        step: 'loaded',
        page: Page<User>
    }>
    |Readonly<{
        step: 'loading'
    }>
    |Readonly<{
        step: 'error',
        error: Error
    }>

@Injectable({
    providedIn: 'root'
})
export class UsersStore {

    private readonly page$ = new BehaviorSubject<PageState>({
        step: 'loading'
    })

    private readonly params$ = new BehaviorSubject<ParamsState>({
        currentPage: 0,
        itemsPerPage: 10
    })

    constructor(private readonly usersRestService: UsersRestService){}

    params(): Observable<ParamsState> {
        return this.params$.asObservable()
    }

    page(): Observable<PageState> {
        return this.page$.asObservable()
    }

    load(params: LoadParams): void {
        const currentParams = this.params$.value
        const newPage = (() => {
            if (typeof params.itemsPerPage === 'number' && params.itemsPerPage !== currentParams.itemsPerPage)
                return 0
            return typeof params.page === 'number'
                ? params.page
                : currentParams.currentPage
        })()
        const newItemsPerPage = typeof params.itemsPerPage === 'number' ? params.itemsPerPage : currentParams.itemsPerPage
        const newParams = {
            currentPage: newPage,
            itemsPerPage: newItemsPerPage
        }
        this.params$.next(newParams)
        this.page$.next({ step: 'loading' })
        this.usersRestService.paginate(newParams.currentPage, newParams.itemsPerPage)
            .subscribe({
                next: page => this.page$.next({
                    step: 'loaded',
                    page
                }),
                error: error => this.page$.next({
                    step: 'error',
                    error
                })
            })
    }
}