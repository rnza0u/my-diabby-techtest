import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class SecurityHeadersMiddleware implements NestMiddleware {

    constructor(private readonly cspExcludePaths: readonly string[]){}
    
    use(req: Request, res: Response, next: NextFunction): void {

        if (!this.cspExcludePaths.includes(req.path)){
            res.setHeader('Content-Security-Policy', 'default-src: none;')
        }

        res.setHeader('X-Frame-Options', 'DENY')

        next()
    }
}