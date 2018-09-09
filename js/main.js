import loginAction from './services/login';
import signupAction from './services/signup';
import navbarHandler from './services/navbar';
import signout from './services/signout';

const loginButton = document.getElementById("loginActionButton");
if (loginButton) {
    loginButton.addEventListener("click", loginAction);
}

const signupButton = document.getElementById('signupButtonAction');
if(signupButton) {
    signupButton.addEventListener('click', signupAction)
}

const topnav = document.getElementById("topnav");
if(topnav) {
    navbarHandler();
}

const logoutButton = document.getElementById('logout');
if(logoutButton) {
    logoutButton.addEventListener('click', signout);
}


