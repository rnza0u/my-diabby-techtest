export type UserProps = Readonly<{
    id: number
    firstname: string
    lastname: string
}>

export class User {

    readonly id: number
    readonly firstname: string
    readonly lastname: string

    get fullname(){
        return `${this.lastname.toUpperCase()} ${this.firstname[0].toUpperCase()}${this.firstname.slice(1).toLowerCase()}`
    }

    constructor(props: UserProps){
        this.id = props.id
        this.firstname = props.firstname
        this.lastname = props.lastname
    }
}