export class Page<T> {
    constructor(readonly items: readonly T[], readonly total: number){}
}