import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {videosRouter} from './routes/videos-router'
import {bloggersRouter} from './routes/bloggers-router'
import {postsRouter} from './routes/posts-router'
//create express app
const app = express()

app.use(cors())
app.use(bodyParser.json())


const port = process.env.PORT || 5005

export function isNumeric(id: any) {
    return !isNaN(parseFloat(id)) && isFinite(id)
}

app.get('/', (req: Request, res: Response) => {
    res.send('Hello: World!!!!- express (videos and posts)')
})

app.use('/videos', videosRouter)
app.use('/bloggers', bloggersRouter)
app.use('/posts', postsRouter)
//start app
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
