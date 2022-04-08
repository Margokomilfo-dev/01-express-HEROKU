import {Request, Response, Router} from 'express'
import {isNumeric} from '../index'
import {bloggersRepository} from '../repositories/bloggers-repository'

export const bloggersRouter = Router({})


bloggersRouter.get('/', (req: Request, res: Response) => {
    const bloggers = bloggersRepository.findBloggers(req.query.name?.toString())
    res.status(200).send(bloggers)
})
bloggersRouter.post('/', (req: Request, res: Response) => {
    const name = req.body.name
    const youtubeUrl = req.body.youtubeUrl
    const falseParams = checkNameAndUrl(name, youtubeUrl)
    if(falseParams){
        res.status(400).send(falseParams)
        return
    }
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
    const trulyId = checkNumId(id)
    if (!trulyId) {
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
bloggersRouter.put('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
   const trulyId = checkNumId(id)
    if (!trulyId) {
        res.send(400)
        return
    }
    const name = req.body.name
    const youtubeUrl = req.body.youtubeUrl
    const falseParams = checkNameAndUrl(name, youtubeUrl)
    if(falseParams){
        res.status(400).send(falseParams)
        return
    }
    const isUpdated = bloggersRepository.updateBlogger(id, name, youtubeUrl)
    if (isUpdated) {
        res.sendStatus(204)
    } else res.send(404)
})
bloggersRouter.delete('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const trulyId = checkNumId(id)
    if (!trulyId) {
        res.send(400)
        return
    }
    const isDeleted = bloggersRepository.deleteBlogger(id)
    if (isDeleted) {
        res.send(204)
    } else res.send(404)
})

const checkNumId = (id: any) => {
    return !(!id || !isNumeric(id));
}
const checkNameAndUrl = (name: string, url: string) => {
    if (!name || !url) {
      return{
            data: {},
            resultCode: 1,
            errorsMessages: [{message: 'no res.body', field: 'name or youtubeUrl'}]
        }
    }
    if (url) {
        const regex = new RegExp('^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$')
        const result = regex.test(url)
        if (!result) {
            return {
                data: {},
                resultCode: 1,
                errorsMessages: [
                    {
                        message: 'The field YoutubeUrl must match the regular expression \'^https://([a-zA-Z0-9_-]+\\\\.)+[a-zA-Z0-9_-]+(\\\\/[a-zA-Z0-9_-]+)*\\\\/?$\'.',
                        field: 'youtubeUrl'
                    }
                ]
            }
        }
    }
    else return false
}