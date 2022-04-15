"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumeric = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const videos_router_1 = require("./routes/videos-router");
const bloggers_router_1 = require("./routes/bloggers-router");
const posts_router_1 = require("./routes/posts-router");
//create express app
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
const port = process.env.PORT || 5005;
function isNumeric(id) {
    return !isNaN(parseFloat(id)) && isFinite(id);
}
exports.isNumeric = isNumeric;
app.get('/', (req, res) => {
    res.send('Hello: World!!!!- express (videos and posts)');
});
app.use('/videos', videos_router_1.videosRouter);
app.use('/bloggers', bloggers_router_1.bloggersRouter);
app.use('/posts', posts_router_1.postsRouter);
//start app
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map