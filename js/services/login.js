import config from '../config';
import alert from '../functions/alert'
import Loader from '../functions/loader'
import redirect from '../functions/redirect';
import networkErrorHandler from '../functions/networkErrorHandler';

const login = function login() {
    const apiUrl = config.apiUrl;
    const formData = new FormData();
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const loader = new Loader();
    formData.append("email", email);
    formData.append("password", password)

    if (email == ""  || password == "") {
        return alert("Fields can't be empty", 'Error')
    }
    
    loader.show();
    fetch(apiUrl + "auth/login", {
        method : "POST",
        body : formData
    })
    .then((response) => {
        loader.hide();
        if (!response.ok) {
            alert("Login Error", 'The password or username is not correct');
        }
        else {
            const token = new Token();
            token.setToken(response.body.token);
            redirect('/index.html');
        }
    })
    .catch(networkErrorHandler);
}

export default login;