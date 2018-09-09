import config from '../config';
import alert from '../functions/alert'
import Loader from '../functions/loader'
import networkErrorHandler from '../functions/networkErrorHandler';
import getHash from '../functions/getHash';
import setNavigation from '../functions/setNavigation';

const askQuestion = function askQuestion() {
    const apiUrl = config.apiUrl;
    const loader = new Loader();

    const limit = config.questionListLimit;
    let page;
    if (getHash() == "" || getHash() == "1" || Number(getHash()) === NaN) {
        page = 1;
    } else {
        page = Number(getHash());
    }

    loader.show();
    let responseOk = true;
    fetch(`${apiUrl}questions?date=DESC&limit=${limit}&page=${page}`)
        .then((response) => {
            loader.hide();
            if (!response.ok) {
                responseOk = false;
            }
            return response.json();
        })
        .then((response) => {
            if (responseOk) {
                let dataContent = "";
                response.data.forEach( data => {
                    const newDate = new Date(data.created_on).toGMTString()
                    dataContent += `<div class="card">
                    <a href="/question.html#${data.question_id}">
                    <div class="container">
                        <h4><b>${data.title}</b></h4>
                        <p>By: ${data.display_name} On: ${newDate}</p>
                    </div>
                    </a>
                </div>`;
                });

                const questionList = document.getElementById('questions-list');
                if (questionList) {
                    questionList.innerHTML = dataContent;
                    setNavigation(page);
                }

            } else {
                alert(response.message, 'Error');
            }
        })
        .catch(networkErrorHandler);
}

export default askQuestion;