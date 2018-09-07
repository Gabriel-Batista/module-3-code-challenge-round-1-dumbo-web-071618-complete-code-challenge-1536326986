document.addEventListener('DOMContentLoaded', function () {

    const imageId = 74 //Enter your assigned imageId here

    const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

    const likeURL = `https://randopic.herokuapp.com/likes/`

    const commentsURL = `https://randopic.herokuapp.com/comments/`

    fetch(imageURL)
        .then(res => res.json())
        .then(json => {
            document.querySelector('#image').src = json.url
            document.querySelector('#name').innerText = json.name
            document.querySelector('#likes').innerText = json.like_count

            json.comments.forEach(comment => {
                createComment(comment.content, comment.id)
            })
        })

    document.querySelector("#like_button").addEventListener("click", e => {
        fetch(likeURL, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image_id: imageId
            })
        })

        document.querySelector('#likes').innerText = Number.parseInt(document.querySelector('#likes').innerText) + 1
    })

    document.querySelector("#submit").addEventListener("click", e => {
        e.preventDefault()
        let new_comment = document.querySelector("#comment_input").value

        fetch(commentsURL, {
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
        .then(json => createComment(new_comment, json.id))

        
        document.querySelector("#comment_input").value = ""
    })

})


function createComment(comment, commentId) {
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
