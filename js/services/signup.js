import config from '../config';
import alert from '../functions/alert'
import Loader from '../functions/loader'
import redirect from '../functions/redirect';
import networkErrorHandler from '../functions/networkErrorHandler';
import Token from '../functions/token';

const signup = () => {
    const apiUrl = config.apiUrl;

    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const displayName = document.getElementById("displayName");
    const confirmPassword = document.getElementById('confirm-password');

    const loader = new Loader();

    const body = {
        email: email.value,
        password: password.value,
        displayName: displayName.value
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('displayName', displayName);

    if (email.value == "" || password.value == "" || displayName.value == "") {
        return alert("Fields can't be empty", 'Error')
    }

    if (password.value !== confirmPassword.value) {
        return alert("Passwords do not match", 'Error')
    }

    loader.show();
    let responseOk = true;
    fetch(apiUrl + "auth/signup", {
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

export default signup;