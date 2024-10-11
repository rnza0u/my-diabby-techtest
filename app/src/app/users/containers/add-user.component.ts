import { Component, inject, OnDestroy, OnInit } from '@angular/core'
import { AddUserStore } from '../state/add-user.store'
import { AddUserFormComponent, SubmitEvent } from '../presenters/add-user-form.component'
import { AsyncPipe } from '@angular/common'
import { Subscription } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { AddUserHeadingComponent } from '../presenters/add-user-title.component'

@Component({
    standalone: true,
    imports: [AddUserFormComponent, AddUserHeadingComponent, AsyncPipe],
    selector: 'app-add-user',
    template: `
        <app-add-user-heading (back)="navigateBack()"></app-add-user-heading>
        @let state = (state$ | async)!;
        <app-add-user-form 
            (submitted)="formSubmit($event)" 
            [disabled]="['adding', 'success'].includes(state.step)">
        </app-add-user-form>
    `,
    styles: [
        `h1 {
            font-size: 1.5em;
        }`
    ]
})
export class AddUserComponent implements OnInit, OnDestroy {

    readonly state$ = this.store.state()

    private readonly snackBar = inject(MatSnackBar)
    
    subscription!: Subscription

    constructor(private readonly store: AddUserStore, private readonly router: Router){}
    
    ngOnInit(): void {
        this.subscription = this.state$
            .subscribe(state => {
                switch (state.step){
                    case 'success':
                        this.snackMessage('L\'utilisateur a été ajouté avec succès. Redirection en cours...')
                        setTimeout(() => this.navigateToUsers(), 3000)
                        break
                    case 'error':
                        switch (state.error){
                            case 'already-exists':
                                this.snackMessage('Cet utilisateur existe déjà !')
                                break
                            default:
                                this.snackMessage(`Une erreur est survenue...`)
                                break
                        }
                }
            })
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }

    formSubmit(event: SubmitEvent): void {
        this.store.add(event)
    }

    navigateBack(): void {
        this.navigateToUsers()
    }

    private navigateToUsers(): void {
        this.router.navigateByUrl('/users')
    }

    private snackMessage(message: string){
        this.snackBar.open(message, undefined, {
            duration: 3000
        })
    }
}