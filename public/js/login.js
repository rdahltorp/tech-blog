const loginFormHandler = async (event) => {
    //Prevents form being submitted via browser and refreshing
    event.preventDefault();

    //Values from form
    const username = document.querySelector('#usernameLogin').value.trim();
    const password = document.querySelector('#passwordLogin').value.trim();

    //Checks is username and password values are present, if true run post route
    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        })  
        
        //Send user to user dashboard
        if (response.ok) {
            document.location.replace('/api/users/dashboard');
        } else {
            alert(response.statusText)
        }
    };
}

document
  .querySelector('.login-form')
  .addEventListener('#loginBtn', loginFormHandler);