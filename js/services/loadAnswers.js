import config from '../config';
import alert from '../functions/alert'
import Loader from '../functions/loader'
import networkErrorHandler from '../functions/networkErrorHandler';
import getHash from '../functions/getHash';

const loadAnswers = () => {
    const apiUrl = config.apiUrl;
    const questionId = getHash();
    const loader = new Loader();
    loader.show();
    let responseOk = true;

    fetch(`${apiUrl}questions/${questionId}/answers?date=DESC`)
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
            response.data.forEach(data => {
                const {content, display_name, created_on} = data;
                const newDate = new Date(created_on).toGMTString()
                dataContent += ` <div class="card">
                <div class="container">
                    <h4><b> ${content}</b></h4>
                    <p>By: ${display_name} On: ${newDate}</p>
                </div>
            </div>`;
            });

            const answerList = document.getElementById('answer-list');
            if (answerList) {
                answerList.innerHTML = dataContent;
                if (response.data.length < 1) {
                    answerList.innerHTML = `<h4> No answers yet.</h4>`
                }
            }

        } else {
            alert(response.message, 'Error');
        }
    })
    .catch(networkErrorHandler);
}



export default loadAnswers;