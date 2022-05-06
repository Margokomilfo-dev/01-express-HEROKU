import {Request, Response, Router} from 'express'
import {postRepository} from '../repositories/posts-repository'
import {bloggersRepository} from '../repositories/bloggers-repository'
import {
    bloggerIdValidation,
    contentValidation, inputValidationMiddleware,
    shortDescriptionValidation,
    titleValidation
} from '../middlewares/input-validation-middleware'

export const postsRouter = Router({})

postsRouter.get('/', (req: Request, res: Response) => {
    const posts = postRepository.getPosts()
    res.status(200).send(posts)
})
postsRouter.post('/',
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    bloggerIdValidation,
    inputValidationMiddleware, (req: Request, res: Response) => {
        const title = req.body.title
        const shortDescription = req.body.shortDescription
        const content = req.body.content
        const bloggerId = req.body.bloggerId
        const blogger = bloggersRepository.findBloggerById(bloggerId)
        if (!blogger) {
            res.status(400).send({
                data: {},
                resultCode: 1,
                errorsMessages: [{message: 'no blogger with this id', field: 'bloggerId'}]
            })
            return
        }
        const newPost = postRepository.createPost(title, shortDescription, content, bloggerId)
        if (newPost) {
            res.status(201).send(newPost)
        } else {
            res.status(400).send({
                resultCode: 1,
                errorsMessages: [{message: 'post is not created', field: '-'}]
            })
        }
    })
postsRouter.get('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    if (!id) {
        res.send(400)
        return
    }
    const post = postRepository.getPostById(id)
    if (post) {
        res.send(post)
    } else {
        res.send(404)
    }
})
postsRouter.put('/:id',
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    bloggerIdValidation,
    inputValidationMiddleware, (req: Request, res: Response) => {
        const id = parseInt(req.params.id)
        if (!id) {
            res.send(400)
            return
        }
        const title = req.body.title
        const shortDescription = req.body.shortDescription
        const content = req.body.content
        const bloggerId = req.body.bloggerId

        const blogger = bloggersRepository.findBloggerById(bloggerId)
        if (!blogger) {
            res.status(400).send({
                resultCode: 1,
                errorsMessages: [{message: 'blogger is not created', field: 'bloggerId'}]
            })
            return
        }
        const isUpdated = postRepository.updatePost(id, title, shortDescription, content, bloggerId)
        if (isUpdated) {
            res.sendStatus(204)
        } else res.send(404)
    })
postsRouter.delete('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    if (!id) {
        res.send(400)
        return
    }
    const isDeleted = postRepository.deletePost(id)
    if (isDeleted) {
        res.send(204)
    } else res.send(404)
})