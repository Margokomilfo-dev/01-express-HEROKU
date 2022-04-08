import {bloggersRepository, BloggerType} from './bloggers-repository'


export type PostType = {
    id: number, title: string,
    shortDescription: string,
    content: string,
    bloggerId: BloggerType['id'] }
let posts: Array<PostType> = [
    {id: 1, title: 'title1', shortDescription: 'shortDescription1', content: 'content1', bloggerId: 1},
    {id: 2, title: 'title2', shortDescription: 'shortDescription2', content: 'content1', bloggerId: 1},
    {id: 3, title: 'title3', shortDescription: 'shortDescription3', content: 'content1', bloggerId: 2},
]
export const postRepository ={
    getPosts(){
       return posts
    },
    createPost(title:string, descr: string, content: string, bloggerId: number){
        const postsLength = posts.length
        const newPost: PostType = {
            id: +(new Date()),
            title,
            shortDescription: descr,
            content,
            bloggerId,
        }
        posts.push(newPost)
        if (postsLength < posts.length) {
            return newPost
        } else return null
    },
    getPostById(id:number){
        const post = posts.find(p => p.id === id)
        if (post) {
            const blogger = bloggersRepository.findBloggerById(post.bloggerId)
            if(blogger){
                return {...post, bloggerName: blogger?.name}
            } else return null
        } else return null
    },
    updatePost(id:number,title:string, descr: string, content: string, bloggerId: number){
        const blogger = bloggersRepository.findBloggerById(bloggerId)
        const post = posts.find(p => p.id === id)
        if (blogger && post) {
            posts = posts.map(p => {
                if (p.id === id) {
                    return {...p, title, bloggerId, content, shortDescription:descr}
                } else return p
            })
            return true
        } else return false
    },
    deletePost(id:number){
        let newPosts = posts.filter(p => p.id !== id)
        if (newPosts.length < posts.length) {
            posts = newPosts
            return true
        } else {
            return false
        }
    }
}