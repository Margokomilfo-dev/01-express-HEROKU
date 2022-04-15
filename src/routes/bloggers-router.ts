import {Request, Response, Router} from 'express'
import {bloggersRepository} from '../repositories/bloggers-repository'
import {
    inputValidationMiddleware,
    nameValueValidation,
    youtubeUrlValidation
} from '../middlewares/input-validation-middleware'

export const bloggersRouter = Router({})

bloggersRouter.get('/', (req: Request, res: Response) => {
    const bloggers = bloggersRepository.findBloggers(req.query.name?.toString())
    res.status(200).send(bloggers)
})

bloggersRouter.post('/',
    nameValueValidation,
    youtubeUrlValidation,
    inputValidationMiddleware, (req: Request, res: Response) => {
        const name = req.body.name
        const youtubeUrl = req.body.youtubeUrl
        const blogger = bloggersRepository.createBlogger(name, youtubeUrl)

        if (blogger) {
            res.status(201).send(blogger)
        } else {
            res.status(400).send({
                data: {},
                resultCode: 1,
                errorsMessages: [{message: 'blogger is not created', field: '-'}]
            })
        }
    })
bloggersRouter.get('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    if (!id) {
        res.send(400)
        return
    }
    const blogger = bloggersRepository.findBloggerById(id)
    if (blogger) {
        res.send(blogger)
    } else {
        res.send(404)
    }

})
bloggersRouter.put('/:id',
    nameValueValidation,
    youtubeUrlValidation,
    inputValidationMiddleware, (req: Request, res: Response) => {
        const id = parseInt(req.params.id)
        if (!id) {
            res.send(400)
            return
        }
        const name = req.body.name
        const youtubeUrl = req.body.youtubeUrl

        const isUpdated = bloggersRepository.updateBlogger(id, name, youtubeUrl)
        if (isUpdated) {
            res.sendStatus(204)
        } else res.send(404)
    })
bloggersRouter.delete('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    if (!id) {
        res.send(400)
        return
    }
    const isDeleted = bloggersRepository.deleteBlogger(id)
    if (isDeleted) {
        res.send(204)
    } else res.send(404)
})

