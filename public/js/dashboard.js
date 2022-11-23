//New Post functionality
const newPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title-np').value.trim();
    const description = document.querySelector('#description-np').value.trim();
    console.log(title, description);

    if (title && description) {
        const response = await fetch('/api/users/dashboard', {
            method: 'POST',
            body: JSON.stringify({ title, description }),
            headers: { 'Content-Type': 'application/json' }
        })

        if (response.ok) {
            document.location.replace('/api/users/dashboard');
        } else {
            alert(response.statusText)
        }
    };
}

document.querySelector('.newPost-form').addEventListener('submit', newPostHandler);


//Update Post - to come


//Delete Post
const delPostHandler = async (event) => {
        const id = event.target.dataset.id;
        console.log(id);

        const response = await fetch(`/api/users/dashboard/${id}`, {
            method: 'DELETE',
          });

          if (response.ok) {
            document.location.replace('/api/users/dashboard');
    }
}

document.querySelector('.postWrapper').addEventListener('click', delPostHandler);