// import functions and grab DOM elements
import {
    redirectToBuild,
    signInUser,
    signupUser
} from './fetch-utils.js';
// let state

// set event listeners 
  // get user input
  // use user input to update state 
  // update DOM to reflect the new state

const signInForm = document.getElementById(`sign-in`);
const signInEmail = document.getElementById(`sign-in-email`);
const signInPassword = document.getElementById(`sign-in-password`);

const signUpForm = document.getElementById(`sign-up`);
const signUpEmail = document.getElementById(`sign-up-email`);
const signUpPassword = document.getElementById(`sign-up-password`);

redirectToBuild();

signUpForm.addEventListener(`submit`, async(e) => {
    e.preventDefault();
    const user = await signupUser(signUpEmail.value, signUpPassword.value);
    console.log(user);
    if (user){
        redirectToBuild();
    } else {
        console.error(user);
    }
});

signInForm.addEventListener(`submit`, async(e) => {
    e.preventDefault();
    const user = await signInUser(signInEmail.value, signInPassword.value);

    if (user) {
        redirectToBuild();
    } else {
        console.error(user);
    }
});