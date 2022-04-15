import {Request, Response, Router} from 'express'
import {isNumeric} from '../index'
import {videosRepository} from '../repositories/videos-repository'
import {validationResult} from 'express-validator'
import {inputValidationMiddleware, titleValidation} from '../middlewares/input-validation-middleware'

export const videosRouter = Router({})



videosRouter.get('/', (req: Request, res: Response) => {
    const videos = videosRepository.getVideos()
    res.send(videos)
})
videosRouter.get('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    if (!id || !isNumeric(id)) {
        res.send(404)
        return
    }
    const video = videosRepository.getVideoById(id)
    if (video) {
        res.send(video)
    } else {
        res.send(404)
    }
})
videosRouter.delete('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    console.log(id)
    if (!id || !isNumeric(id)) {
        res.send(404)
        return
    }
    const isDeleted = videosRepository.deleteVideo(id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})

videosRouter.post('/',
    titleValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        const title = req.body.title
        const newVideo = videosRepository.createVideo(title)
        if (newVideo) {
            res.status(201).send(newVideo)
        } else {
            res.status(400).send({
                data: {},
                resultCode: 1,
                errorsMessages: [{message: 'no res.body', field: 'name or youtubeUrl'}]
            })
        }
    })

videosRouter.put('/:id',
    titleValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        const id = +req.params.id
        const title = req.body.title
        if (!id || !isNumeric(id)) {
            res.send(400)
            return
        }
        const isUpdated = videosRepository.updateVideo(id, title)
        if (isUpdated) {
            res.sendStatus(204)
        } else res.send(404)
    })