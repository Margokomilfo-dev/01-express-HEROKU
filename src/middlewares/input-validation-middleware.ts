import {NextFunction, Request, Response} from 'express'
import {body, validationResult} from 'express-validator'

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction)=> {
    const errors = validationResult(req)
    console.log(errors)
    if (!errors.isEmpty()) {
        res.status(400).json({
            data: {},
            resultCode: 1,
            errorsMessages: errors.array().map((e)=> ({
                message: e.msg,
                field: e.msg
            }))})
    } else {
        next()
    }
}

const regexp =  new RegExp('^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$')
export const titleValidation = body('title').trim().isLength({min: 2, max: 33})
    .withMessage('title is required and its length should be 3-33 symbols')
export const nameValueValidation = body('name').trim().isLength({min: 2, max: 33})
    .withMessage('name is required and its length should be 3-33 symbols')
export const youtubeUrlValidation = body('youtubeUrl').matches(regexp).isLength({min: 2, max: 33})
    .withMessage('UrlValidation is not valid')
export const shortDescriptionValidation = body('shortDescription').trim().isLength({min: 2, max: 33})
    .withMessage('shortDescription is required and its length should be 3-33 symbols')
export const contentValidation = body('content').trim().isLength({min: 2, max: 33})
    .withMessage('content is required and its length should be 3-33 symbols')
export const bloggerIdValidation = body('bloggerId').isNumeric()
    .withMessage('bloggerId is required and its number')

