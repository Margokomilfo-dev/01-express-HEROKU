"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
//create express app
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
const port = process.env.PORT || 5000;
let videos = [
    { id: 1, title: 'About JS - 01', author: 'it-incubator.eu' },
    { id: 2, title: 'About JS - 02', author: 'it-incubator.eu' },
];
app.get('/', (req, res) => {
    res.send('Hello, World!!!!');
});
app.get('/videos', (req, res) => {
    res.send(videos); //res.json = res.send
});
app.post('/videos', (req, res) => {
    const videosLength = videos.length;
    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: 'it-incubator.eu'
    };
    videos.push(newVideo);
    if (videosLength > videos.length) {
        res.status(201).send(newVideo);
    }
    else {
        res.send(400);
    }
});
app.get('/videos/:id', (req, res) => {
    const id = +req.params.id;
    if (id) {
        const video = videos.find(v => v.id === id);
        if (video) { //(!!video)
            res.send(video); //res.json = res.send
        }
        else
            res.send(404);
    }
    else {
        res.status(500).send('id is required');
    }
});
app.put('/videos/videos/:id', (req, res) => {
    const id = +req.params.id;
    const video = videos.find(v => v.id === id);
    if (id && video) {
        //реализация Димыча
        // const video = videos.find(v=> v.id === id)
        // if(video){
        //     video.title = req.body.title
        //     res.send(videos)
        // }else res.send(videos)
        videos = videos.map(v => {
            if (v.id === id) {
                return Object.assign(Object.assign({}, v), { title: req.body.title });
            }
            else
                return v;
        });
        res.status(204).send(videos);
    }
    else
        res.send(404);
});
app.delete('/videos/:id', (req, res) => {
    const id = +req.params.id;
    if (id) {
        let newVideos = videos.filter(v => v.id !== id);
        if (newVideos.length < videos.length) {
            videos = newVideos;
            res.send(204);
        }
        else
            res.send(404);
    }
    else
        res.send(404);
});
//start app
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map