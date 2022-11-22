//New Post functionality
const newPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title-np').value.trim();
    const description = document.querySelector('#description-np').value.trim();
    
    if (title && description) {
        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({ title, description }),
            headers: { 'Content-Type': 'application/json' }
        })

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText)
        }
    };
}

document.querySelector('.newPost-form').addEventListener('submit', newPostHandler);


//Update Post


//Delete Post
const delPostHandler = async (event) => {
    if(event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/post/${id}`, {
            method: 'DELETE',
          });

          if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('#deleteBtn').addEventListener('click', delPostHandler);