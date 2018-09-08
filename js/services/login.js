import config from '../config';


const login = function login() {
    const apiUrl = config.apiUrl;
    const formData = new FormData();
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    formData.append("email", email);
    formData.append("password", password)

    if (email == ""  || password == "") {
        return console.log("Field can not be empty");
    }

    fetch(apiUrl + "auth/login", {
        method : "POST",
        body : formData
    })
    .then((response) => {
        if (!response.ok) {
            console.log("an error");
        }
        console.log(response);
    })
    .catch((err) => {
        console.error("No Network")
    })
}

export default login;