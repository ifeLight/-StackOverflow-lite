class Loader {
    show() {
        document.getElementById("loader").style.display = "block";
        var overlay = document.getElementById('overlay');
        overlay.style.display = "block";
        
    }
    hide() {
        var overlay = document.getElementById('overlay');
        overlay.style.display = "none";
        document.getElementById("loader").style.display = "none";
    }
}

export default Loader;