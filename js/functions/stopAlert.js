function stopAlert() {
    var overlay = document.getElementById('overlay');
    var alertbox = document.getElementById('alertbox');
    overlay.style.display = "none";
    alertbox.style.display = "none";
}

export default stopAlert