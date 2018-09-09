import isLoggedIn from '../functions/isLoggedIn';

const navbarHandler = () => {
    const topnav = document.getElementById("topnav");
    const topContent = `<li><a href="/">StackOverflow Lite</a></li>`;
    const bottomContent = ``;
    let mainContent;
    if(!isLoggedIn()) {
        mainContent = `<li class="right"><a class="active" href="/login.html">Sign In</a></li>
        <li class="right"><a href="/signup.html">Signup</a></li>
        <li class="right"><a href="/ask.html">Ask a Question</a></li>`;
    } else {
        mainContent = `<li class="right"><a class="active" href="#" id="logout">Logout</a></li>
        <li class="right"><a href="/profile.html">My Profile</a></li>
        <li class="right"><a href="/ask.html">Ask a Question</a></li>
        <li class="right"><a> Welcome </a></li>`
    }

    topnav.innerHTML = topContent + mainContent + bottomContent;
}

export default navbarHandler;