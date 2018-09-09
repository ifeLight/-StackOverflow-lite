import config from '../config';
import alert from '../functions/alert'
import Loader from '../functions/loader'
import networkErrorHandler from '../functions/networkErrorHandler';
import Token from "../functions/token";
import getHash from '../functions/getHash';
import isLoggedIn from '../functions/isLoggedIn';
import redirect from '../functions/redirect';
import loadAnswers from '../services/loadAnswers';

const postAnswer = () => {
    const apiUrl = config.apiUrl;
    const questionId = getHash();
    const loader = new Loader();
    
    if (!isLoggedIn()) {
        return redirect('/login.html')
    }

    const content = document.getElementById("content");
    if (content.value == "") {
        return alert("Fields can't be empty", 'Error')
    }

    const body = {
        content: content.value
    }

    const token = new Token();
    const tokenValue = token.getToken();

    loader.show();
    let responseOk = true;
    fetch(`${apiUrl}questions/${questionId}/answers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "x-access-token" : tokenValue
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
            alert(response.message, 'Success');
            content.value = "";
            loadAnswers();
        } else {
            alert(response.message, 'Error');
        }
    })
    .catch(networkErrorHandler);
}

export default postAnswer;