import config from '../config';
import alert from '../functions/alert'
import Loader from '../functions/loader'
import networkErrorHandler from '../functions/networkErrorHandler';
import Token from "../functions/token";

const askQuestion = function askQuestion() {
    const apiUrl = config.apiUrl;
    const title = document.getElementById("title");
    const content = document.getElementById("content");
    const loader = new Loader();
    const token = new Token();
    const tokenValue = token.getToken();

    if (title == "" || content == "") {
        return alert("Fields can't be empty", 'Error')
    }

    const body = {
        title: title.value,
        content: content.value
    }

    loader.show();
    let responseOk = true;
    fetch(apiUrl + "questions", {
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
                title.value = "";
                content.value = "";
            } else {
                alert(response.message, 'Error');
            }
        })
        .catch(networkErrorHandler);
}

export default askQuestion;