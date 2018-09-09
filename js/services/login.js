import config from '../config';
import alert from '../functions/alert'
import Loader from '../functions/loader'
import redirect from '../functions/redirect';
import networkErrorHandler from '../functions/networkErrorHandler';
import Token from "../functions/token";

const login = function login() {
    const apiUrl = config.apiUrl;
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const loader = new Loader();

    if (email == "" || password == "") {
        return alert("Fields can't be empty", 'Error')
    }

    const body = {
        email: email.value,
        password: password.value
    }

    loader.show();
    let responseOk = true;
    fetch(apiUrl + "auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(body)
        })
        .then((response) => {
            loader.hide();
            if (!response.ok) {
                responseOk = false;
            }
            return response.json();
        })
        .then((response) => {
            if (responseOk) {
                const token = new Token();
                token.setToken(response.token);
                redirect('/index.html');
            } else {
                alert(response.message, 'Error');
            }
        })
        .catch(networkErrorHandler);
}

export default login;