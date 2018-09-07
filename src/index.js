document.addEventListener('DOMContentLoaded', function () {
    let new_image = new Image()

    new_image.getImage()

    document.querySelector("#like_button").addEventListener("click", e => {new_image.handleLike(e)})

    document.querySelector("#submit").addEventListener("click", e => {new_image.handleComment(e)})

})



