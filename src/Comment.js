class Comment {

    static commentsURL()    {
        return `https://randopic.herokuapp.com/comments/`
    }

    static handleComment(imageId, e) {
        e.preventDefault()
        let new_comment = document.querySelector("#comment_input").value

        fetch(Comment.commentsURL(), {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image_id: imageId,
                content: new_comment
            })
        })
        .then(res => res.json())
        .then(json => Comment.createComment(new_comment, json.id))

        
        document.querySelector("#comment_input").value = ""
    }

    static createComment(comment, commentId) {
        let new_comment = document.createElement('li')
        new_comment.innerText = comment
        new_comment.dataset.id = commentId
    
        let delete_button = document.createElement('Button')
        delete_button.innerText = "DELETE"
        delete_button.addEventListener("click", e => {
            console.log(e.target.parentElement)
            document.querySelector("#comments").removeChild(e.target.parentElement)
    
            fetch(`https://randopic.herokuapp.com/comments/${commentId}`, {
                method: "DELETE"
            })
        })
    
        new_comment.append(delete_button)
        document.querySelector('#comments').append(new_comment)
    }
}
