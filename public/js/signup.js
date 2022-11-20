const { response } = require("express");

const signupFormHandler = async (event) => {
    //Prevents form being submitted via browser and refreshing
    event.preventDefault();

    //Values from form
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        if(response.ok) {
            document.location.replace('/api/users/dashboard');
        } else {
            alert(response.statusText)
        }
    }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);