const dashboardView = document.getElementById("dashboard-view");

function onSignIn(view) {
    const createView = document.getElementById(view);
    createView.style.display = "none"
    dashboardView.style.display = "block";
    const email = document.getElementById("email-field").value
    const usernameElement = document.getElementById("username");
    usernameElement.textContent = email; 
}

function onLogout() {
    document.getElementById("login-view").style.display = "";
    dashboardView.style.display = "none";
}

function onSignUp() {
    document.getElementById("login-view").style.display = "none"
    document.getElementById("auth-view").style.display = ""
}

function onCreate() {
    document.getElementById("login-view").style.display = ""
    document.getElementById("auth-view").style.display = "none"
}


const fileInput = document.getElementById('file-input');
const chooseFileBtn = document.getElementById('choose-file-btn');

chooseFileBtn.addEventListener('click', () => {
    fileInput.click();
});


fileInput.addEventListener('change', function() {
    if (this.files && this.files[0]) {
        const selectedFile = this.files[0];
        alert("You selected: " + selectedFile.name);
        
    }
});