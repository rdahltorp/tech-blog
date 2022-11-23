//Add comment functionality
const newComment = async (event) => {
    event.preventDefault();

    const description = document.querySelector('#comment-description').value.trim();
    const post_id = document.querySelector('#commentBtn').dataset.id
    const user_id = event.target.dataset.user_id;

    console.log(post_id);
    if (description) {
        const response = await fetch(`/post/${post_id}`, {
            method: 'POST',
            body: JSON.stringify({ description, post_id, user_id }),
            headers: { 'Content-Type': 'application/json' }
        })

        if (response.ok) {
            document.location.replace('/');            
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', newComment);
