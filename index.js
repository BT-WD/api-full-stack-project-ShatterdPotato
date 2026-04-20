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