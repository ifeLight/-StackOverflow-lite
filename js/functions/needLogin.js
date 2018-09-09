import isLoggedIn from './isLoggedIn';
import redirect from "./redirect";

const needLogin = () => {
    if (!isLoggedIn()) {
        redirect("/login.html");
    }
}

export default needLogin;