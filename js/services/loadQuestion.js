import config from '../config';
import alert from '../functions/alert'
import Loader from '../functions/loader'
import networkErrorHandler from '../functions/networkErrorHandler';
import getHash from '../functions/getHash';



const loadQuestion = () => {
    const apiUrl = config.apiUrl;
    const loader = new Loader();

    const questionId = getHash();
    loader.show();
    let responseOk = true;

    fetch(`${apiUrl}questions/${questionId}`)
    .then((response) => {
        loader.hide();
        if (!response.ok) {
            responseOk = false;
        }
        return response.json();
    })
    .then((response) => {
        if (responseOk) {
            const newDate = new Date(response.data.created_on).toGMTString();
            let dataContent = `<h3> ${response.data.title}</h3>
            <small>By: ${response.data.display_name} Created on: ${newDate}</small>
            <p>${response.data.content}</p>`;

            const questionList = document.getElementById('question');
            if (questionList) {
                questionList.innerHTML = dataContent;
            }

        } else {
            alert(response.message, 'Error');
        }
    })
    .catch(networkErrorHandler);
}

export default loadQuestion;