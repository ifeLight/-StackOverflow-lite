import stopAlert from './stopAlert';

function customAlert(dialog, header="Alert") {
    var windH = window.innerHeight;
    var windW = window.innerWidth;

    var overlay = document.getElementById('overlay');
    var alertbox = document.getElementById('alertbox');

    overlay.style.display = "block";
    overlay.style.height = windH + "px";

    alertbox.style.left = (windW / 2) - (250 * .5) + "px";
    alertbox.style.top = "100px";
    alertbox.style.display = "block";

    document.getElementById("alertheader").innerHTML = header;
    document.getElementById("alertbody").innerHTML = dialog;
    document.getElementById("alertfooter").innerHTML = "<input type='button' value='ok' id='stopAlert'>";

    const stopAlertButton = document.getElementById("stopAlert");
    stopAlertButton.addEventListener("click", stopAlert); 
}


export default customAlert;