import loginAction from './services/login';
import signupAction from './services/signup';
import navbarHandler from './services/navbar';
import signout from './services/signout';
import needLogin from './functions/needLogin';
import askQuestion from './services/askQuestion';

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

const askPage = document.getElementById('askPage');
if (askPage) {
    needLogin();
}

const askButton = document.getElementById('askButton');
if (askButton) {
    askButton.addEventListener("click", askQuestion);
}


