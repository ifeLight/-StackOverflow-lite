const isLoggedIn = function isUserloggedIn() {
    if (sessionStorage.getItem('auth-token')) {
        return true
    } else {
        return false;
    }
}

export default isLoggedIn;