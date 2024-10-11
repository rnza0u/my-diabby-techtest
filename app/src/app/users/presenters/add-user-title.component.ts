import { Component, EventEmitter, OnInit, Output } from '@angular/core'

// j'aime les emojis
const emojis = ['🥷', '🧑🏽‍🍳', '🫅', '🧞', '🧑🏽‍🔬', '🧑🏽‍🚒', '🧑‍✈️', '🧑‍🚀', '🧑‍🎨', '👷🏽‍♂️', '🧙‍♂️', '🧑🏿‍🔧', '👨🏿‍⚕️', '🧑‍💼', '🦹', '🧑‍🌾']

@Component({
    standalone: true,
    selector: 'app-add-user-heading',
    template: `
        <a href="#" (click)="back.emit()">Retour...</a>
        <h1>{{ emoji }} Nouvel utilisateur</h1>
    `,
    styles: [
        `h1 {
            font-size: 1.5em;
        }`,
        `a {
            font-size: 0.75em;
        }`
    ]
})
export class AddUserHeadingComponent implements OnInit {

    @Output()
    back = new EventEmitter<void>()
    
    emoji!: string

    ngOnInit(): void {
        this.emoji = emojis[Math.floor(Math.random() * emojis.length)]
    }
}