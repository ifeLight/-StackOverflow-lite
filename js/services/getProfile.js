import config from '../config';
import alert from '../functions/alert'
import Loader from '../functions/loader'
import networkErrorHandler from '../functions/networkErrorHandler';
import Token from "../functions/token";

const getProfile = () => {
    const apiUrl = config.apiUrl;
    const loader = new Loader();
    const token = new Token();
    const tokenValue = token.getToken();

    loader.show();
    let responseOk = true;

    fetch(apiUrl + "profile", {
        headers: {
            "x-access-token" : tokenValue
        }
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
            const { data } = response;
            const {answers_no, questions_no, recent_questions, popular_questions} = data;

            const profileContainer = document.getElementById('question');
            const profileContent = `<h3>No of Questions asked : <span>${questions_no}</span></h3>
            <h3>No of Anwers posted : <span>${answers_no}</span></h3>`;
            profileContainer.innerHTML = profileContent;

            let dataContent = "";
            recent_questions.forEach(data => {
                const {title, display_name, created_on, question_id} = data;
                const newDate = new Date(created_on).toGMTString()
                dataContent += `<div class="card"><a href="/question.html#${question_id}">
                <div class="container">
                    <h4><b> ${title}</b></h4>
                    <p>By: ${display_name} On: ${newDate}</p>
                </div></a>
            </div>`;
            });

            const recentQuestionsList = document.getElementById('recent-questions');
            if (recentQuestionsList) {
                recentQuestionsList.innerHTML = dataContent;
                if (recent_questions.length < 1) {
                    recentQuestionsList.innerHTML = `<h4> No Questions by you yet.</h4>`
                }
            }

            dataContent = "";
            popular_questions.forEach(data => {
                const {title, display_name, created_on, no_answers, question_id} = data;
                const newDate = new Date(created_on).toGMTString()
                dataContent += `<div class="card">
                <div class="container"> <a href="/question.html#${question_id}">
                    <h4><b> ${title}</b></h4>
                    <p>By: ${display_name} On: ${newDate} with ${no_answers} answers</p>
                </div></a>
            </div>`;
            });

            const popularQuestionsList = document.getElementById('popular-questions');
            if (popularQuestionsList) {
                popularQuestionsList.innerHTML = dataContent;
                if (popular_questions.length < 1) {
                    popularQuestionsList.innerHTML = `<h4> No Questions by you yet.</h4>`
                }
            }


            console.log(response);
        } else {
            alert(response.message, 'Error');
        }
    })
    .catch(networkErrorHandler);
}

export default getProfile;