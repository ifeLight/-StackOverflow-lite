import config from '../config';
import alert from '../functions/alert'
import Loader from '../functions/loader'
import redirect from '../functions/redirect';
import networkErrorHandler from '../functions/networkErrorHandler';
import Token from '../functions/token';

const signup = () => {
    const apiUrl = config.apiUrl;

    const formData = new FormData();
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const displayName = document.getElementById("displayName");
    const confirmPassword = document.getElementById('confirm-password');

    const loader = new Loader();
    formData.append("email", email);
    formData.append("password", password);
    formData.append('displayName', displayName);

    if (email == ""  || password == "") {
        return alert("Fields can't be empty", 'Error')
    }

    if (password !== confirmPassword) {
        return alert("Passwords do not match", 'Error')
    }

    fetch(apiUrl + "auth/login", {
        method : "POST",
        body : formData
    })

    loader.show();
    fetch(apiUrl + "auth/signup", {
        method : "POST",
        body : formData
    })
    .then((response) => {
        loader.hide();
        if (!response.ok) {
            alert("Signup Error", 'User with this email already exist');
        }
        else {
            const token = new Token();
            token.setToken(response.body.token);
            redirect('/index.html');
        }
    })
    .catch(networkErrorHandler);


}

export default signup;
