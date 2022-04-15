let videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
]
export const videosRepository={
    getVideos(){
        return videos
    },
    createVideo(title:string){
        const videosLength = videos.length
        const newVideo = {
            id: +(new Date()),
            title,
            author: 'it-incubator.eu'
        }
        videos.push(newVideo)
        if (videosLength < videos.length) {
           return newVideo
        } else {
            return null
        }
    },
    getVideoById(id:number){
        const video = videos.find(v => v.id === id)
        if (video) {
           return video
        } else return null
    },
    updateVideo(id:number,title:string){
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
                    return {...v, title}
                } else return v
            })
           return true
        } else return false
    },
    deleteVideo(id:number){
        let newVideos = videos.filter(v => v.id !== id)
        if (newVideos.length < videos.length) {
            videos = newVideos
            return true
        } else {
            return false
        }
    }
}