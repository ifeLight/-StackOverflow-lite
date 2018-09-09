import loginAction from './services/login';
import signupAction from './services/signup';
import navbarHandler from './services/navbar';
import signout from './services/signout';
import needLogin from './functions/needLogin';
import askQuestion from './services/askQuestion';
import questionListAction from './services/questionList';
import loadQuestion from './services/loadQuestion';
import loadAnswers from './services/loadAnswers';

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

const questionList = document.getElementById('questions-list');
if(questionList) {
    questionListAction();
    window.addEventListener('hashchange', questionListAction);
}

const questionPage = document.getElementById('questionPage');
if (questionPage) {
    loadQuestion();
    loadAnswers();
}

