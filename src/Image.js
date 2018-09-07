class Image {
    constructor() {
        this.imageId = 74
        this.imageURL = `https://randopic.herokuapp.com/images/${this.imageId}`
        this.likeURL = `https://randopic.herokuapp.com/likes/`
    }

    getImage() {
        fetch(this.imageURL)
            .then(res => res.json())
            .then(json => {
                this.imageId = json.id
                document.querySelector('#image').src = json.url
                document.querySelector('#name').innerText = json.name
                document.querySelector('#likes').innerText = json.like_count

                json.comments.forEach(comment => {
                    Comment.createComment(comment.content, comment.id)
                })
            })
    }

    handleLike(e) {
        fetch(this.likeURL, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image_id: this.imageId
            })
        })

        document.querySelector('#likes').innerText = Number.parseInt(document.querySelector('#likes').innerText) + 1
    }

    handleComment(e){
        Comment.handleComment(this.imageId, e)
    }

}
