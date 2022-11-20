//New Post 
const newPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const description = document.querySelector('#post-description').value.trim();
    const userId = req.session.id; //not sure if this is right

    //Need to create a route that adds a new post

}


//Update Post

    //Need to create a route that updates a post

//Delete Post

    //Need to create a route that destroys a post