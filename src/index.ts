import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
//create express app
const app = express()

app.use(cors())
app.use(bodyParser.json())


const port = process.env.PORT || 5005
type BloggerType = { id: number, name: string, youtubeUrl: string }
let bloggers = [
    {id: 1, name: 'blogger1', youtubeUrl: 'youtube1.com'},
    {id: 2, name: 'blogger2', youtubeUrl: 'youtube2.com'},
    {id: 3, name: 'blogger3', youtubeUrl: 'youtube3.com'}
]
type PostType = { id: number, title: string, shortDescription: string, content: string, bloggerId: BloggerType['id'] }
let posts: Array<PostType> = [
    {id: 1, title: 'title1', shortDescription: 'shortDescription1', content: 'content1', bloggerId: 1},
    {id: 2, title: 'title2', shortDescription: 'shortDescription2', content: 'content1', bloggerId: 1},
    {id: 3, title: 'title3', shortDescription: 'shortDescription3', content: 'content1', bloggerId: 2},
]

let videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
]

function isNumeric(id: any) {
    return !isNaN(parseFloat(id)) && isFinite(id)
}

app.get('/', (req: Request, res: Response) => {
    res.send('Hello: World!!!!- express (videos and posts)')
})

app.get('/videos', (req: Request, res: Response) => {
    res.send(videos) //res.json = res.send
})
app.post('/videos', (req: Request, res: Response) => {
    const videosLength = videos.length
    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: 'it-incubator.eu'
    }
    videos.push(newVideo)
    if (videosLength > videos.length) {
        res.status(201).send(newVideo)
    } else {
        res.status(400).send({
            data: {},
            resultCode: 1,
            errorsMessages: [{message: 'no res.body', field: 'name or youtubeUrl'}]
        })
    }
})
app.get('/videos/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    if (id) {
        const video = videos.find(v => v.id === id)
        if (video) { //(!!video)
            res.send(video)//res.json = res.send
        } else res.send(404)
    } else {
        res.send(404)
    }
})
app.put('/videos/videos/:id', (req: Request, res: Response) => {
    const id = +req.params.id

    if (!id || !isNumeric(id)) {
        res.send(400)
        return
    }
    const video = videos.find(v => v.id === id)
    if (video) {
        //реализация Димыча
        // const video = videos.find(v=> v.id === id)
        // if(video){
        //     video.title = req.body.title
        //     res.send(videos)
        // }else res.send(videos)

        videos = videos.map(v => {
            if (v.id === id) {
                return {...v, title: req.body.title}
            } else return v
        })
        res.sendStatus(204)
    } else res.send(404)
})
app.delete('/videos/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    if (id) {
        let newVideos = videos.filter(v => v.id !== id)
        if (newVideos.length < videos.length) {
            videos = newVideos
            res.send(204)
            return
        } else {
            res.send(404)
            return
        }
    } else res.send(404)
})
//----------------------------------------------------------------------

app.get('/bloggers', (req: Request, res: Response) => {
    res.status(200).send(bloggers)
})
app.post('/bloggers', (req: Request, res: Response) => {
    const bloggerLength = bloggers.length
    const name = req.body.name
    const youtubeUrl = req.body.youtubeUrl

    if (!name || !youtubeUrl) {
        res.status(400).send({
            data: {},
            resultCode: 1,
            errorsMessages: [{message: 'no res.body', field: 'name or youtubeUrl'}]
        })
        return
    }
    if (youtubeUrl) {
        const regex = new RegExp('^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$')
        const result = regex.test(youtubeUrl)
        if (!result) {
            res.status(400).send({
                data: {},
                resultCode: 1,
                errorsMessages: [
                    {
                        message: 'The field YoutubeUrl must match the regular expression \'^https://([a-zA-Z0-9_-]+\\\\.)+[a-zA-Z0-9_-]+(\\\\/[a-zA-Z0-9_-]+)*\\\\/?$\'.',
                        field: 'youtubeUrl'
                    }
                ]
            })
            return
        }
    }

    const newBlogger: BloggerType = {
        id: +(new Date()),
        name: req.body.name,
        youtubeUrl: req.body.youtubeUrl,
    }
    bloggers.push(newBlogger)
    if (bloggerLength < bloggers.length) {
        res.status(201).send(newBlogger)
    } else {
        res.status(400).send({
            data: {},
            resultCode: 1,
            errorsMessages: [{message: 'blogger is not created', field: '-'}]
        })
    }
})
app.get('/bloggers/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    if (!id || !isNumeric(id)) {
        res.send(400)
        return
    }
    if (id) {
        const blogger = bloggers.find(b => b.id === id)
        if (blogger) { //(!!video)
            res.send(blogger)//res.json = res.send
            return
        } else {
            res.send(404)
            return
        }
    } else {
        res.send(404)
    }
})
app.put('/bloggers/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    if (!id || !isNumeric(id)) {
        res.send(400)
        return
    }
    const name = req.body.name
    const youtubeUrl = req.body.youtubeUrl
    if (!name || !youtubeUrl) {
        res.status(400).send({
            data: {},
            resultCode: 1,
            errorsMessages: [{message: 'no res.body', field: 'name or youtubeUrl'}]
        })
        return
    }
    if (youtubeUrl) {
        const regex = new RegExp('^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$')
        const result = regex.test(youtubeUrl)
        if (!result) {
            res.status(400).send({
                data: {},
                resultCode: 1,
                errorsMessages: [
                    {
                        message: 'The field YoutubeUrl must match the regular expression \'^https://([a-zA-Z0-9_-]+\\\\.)+[a-zA-Z0-9_-]+(\\\\/[a-zA-Z0-9_-]+)*\\\\/?$\'.',
                        field: 'youtubeUrl'
                    }
                ]
            })
            return
        }
    }
    const blogger = bloggers.find(b => b.id === id)
    if (blogger) {
        bloggers = bloggers.map(b => {
            if (b.id === id) {
                return {...b, name: req.body.name, youtubeUrl: req.body.youtubeUrl}
            } else return b
        })
        res.sendStatus(204)
    } else res.send(404)
})
app.delete('/bloggers/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    if (!id || !isNumeric(id)) {
        res.send(400)
        return
    }
    if (id) {
        let newBloggers = bloggers.filter(b => b.id !== id)
        if (newBloggers.length < bloggers.length) {
            bloggers = newBloggers
            res.send(204)
        } else {
            res.send(404)
            return
        }
    } else res.send(404)
})
//----------------------------------------------------------------------


app.get('/posts', (req: Request, res: Response) => {
    res.status(200).send(posts)
})
app.post('/posts', (req: Request, res: Response) => {
    const postsLength = posts.length

    const title = req.body.title
    const shortDescription = req.body.shortDescription
    const content = req.body.content
    const bloggerId = +req.body.bloggerId
    let blogger = null
    if (!title || !shortDescription || !content || !bloggerId) {
        res.status(400).send({
            data: {},
            resultCode: 1,
            errorsMessages: [{message: 'no res.body', field: 'title or shortDescription or content or bloggerId'}]
        })
        return
    }
    if (bloggerId) {
        blogger = bloggers.find(b => b.id === bloggerId)
        if (!blogger) {
            res.status(400).send({
                data: {},
                resultCode: 1,
                errorsMessages: [{message: 'no blogger with this id', field: '-'}]
            })
            return
        }
    }
    const newPost: PostType = {
        id: +(new Date()),
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        bloggerId: +req.body.bloggerId,
    }
    posts.push(newPost)
    if (postsLength < posts.length) {
        res.status(201).send(newPost)
        return
    } else {
        res.status(400).send({
            data: {},
            resultCode: 1,
            errorsMessages: [{message: 'post is not created', field: '-'}]
        })
    }
})
app.get('/posts/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    if (!id || !isNumeric(id)) {
        res.send(400)
        return
    }
    if (id) {
        const post = posts.find(p => p.id === id)
        if (post) {
            const blogger = bloggers.find(b => b.id === post.bloggerId)
            res.send({...post, bloggerName: blogger?.name})
            return
        } else {
            res.send(404)
            return
        }
    } else {
        res.send(404)
    }
})
app.put('/posts/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    if (!id || !isNumeric(id)) {
        res.send(400)
        return
    }
    const title = req.body.title
    const shortDescription = req.body.shortDescription
    const content = req.body.content
    const bloggerId = +req.body.bloggerId

    if (!title || !shortDescription || !content || !bloggerId) {
        res.status(400).send({
            data: {},
            resultCode: 1,
            errorsMessages: [{message: 'no res.body', field: 'title or shortDescription or content or bloggerId'}]
        })
        return
    }

    const blogger = bloggers.find(b => b.id === bloggerId)
    const post = posts.find(p => p.id === id)
    if (blogger && post) {
        posts = posts.map(p => {
            if (p.id === id) {
                return {...p, title, bloggerId, content, shortDescription}
            } else return p
        })
        res.sendStatus(204)
        return
    } else res.send(404)
})
app.delete('/posts/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    if (!id || !isNumeric(id)) {
        res.send(400)
        return
    }
    if (id) {
        let newPosts = posts.filter(p => p.id !== id)
        if (newPosts.length < posts.length) {
            posts = newPosts
            res.send(204)
            return
        } else {
            res.send(404)
            return
        }
    } else res.send(404)
})

//start app
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
