import {Request, Response, Router} from 'express'
import {isNumeric} from '../index'
import {postRepository} from '../repositories/posts-repository'
import {bloggersRepository} from '../repositories/bloggers-repository'

export const postsRouter = Router({})


postsRouter.get('/', (req: Request, res: Response) => {
    const posts = postRepository.getPosts()
    res.status(200).send(posts)
})
postsRouter.post('/', (req: Request, res: Response) => {
    const title = req.body.title.trim()
    const shortDescription = req.body.shortDescription?.trim()
    const content = req.body.content?.trim()
    const bloggerId = +req.body.bloggerId

    if (!title || !shortDescription || !content || !bloggerId) {
        res.status(400).send({
            data: {},
            resultCode: 1,
            errorsMessages: [{message: 'no res.body', field: 'title or shortDescription or content or bloggerId'}]
        })
        return
    }
    const blogger = bloggersRepository.findBloggerById(bloggerId)
    if (!blogger) {
        res.status(400).send({
            data: {},
            resultCode: 1,
            errorsMessages: [{message: 'no blogger with this id', field: '-'}]
        })
        return
    }
    const newPost = postRepository.createPost(title, shortDescription, content, bloggerId)
    if (newPost) {
        res.status(201).send(newPost)
    } else {
        res.status(400).send({
            data: {},
            resultCode: 1,
            errorsMessages: [{message: 'post is not created', field: '-'}]
        })
    }
})
postsRouter.get('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    if (!id || !isNumeric(id)) {
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
postsRouter.put('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    if (!id || !isNumeric(id)) {
        res.send(400)
        return
    }
    const title = req.body.title?.trim()
    const shortDescription = req.body.shortDescription?.trim()
    const content = req.body.content?.trim()
    const bloggerId = +req.body.bloggerId

    if (!title || !shortDescription || !content || !bloggerId) {
        res.status(400).send({
            data: {},
            resultCode: 1,
            errorsMessages: [{message: 'no res.body', field: 'title or shortDescription or content or bloggerId'}]
        })
        return
    }
    const isUpdated=postRepository.updatePost(id, title, shortDescription, content, bloggerId)
    if (isUpdated) {
        res.sendStatus(204)
    } else res.send(404)
})
postsRouter.delete('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    if (!id || !isNumeric(id)) {
        res.send(400)
        return
    }
    const isDeleted = postRepository.deletePost(id)
    if(isDeleted){
        res.send(204)
    }else res.send(404)
})