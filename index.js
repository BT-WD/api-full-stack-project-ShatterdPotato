const dashboardView = document.getElementById("dashboard-view");
const api_key = "fa8348adfd7223a66deebf0baedd684f"

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
        getIMGLink(selectedFile)
    }
});

async function getIMGLink(selectedFile) {
    const url = "https://api.imgbb.com/1/upload"
    const formData = new FormData();
    formData.append('image', selectedFile);
    const params = `?key=${api_key}`
    const response = await fetch(url + params, {
        method: 'POST',
        body: formData
    })

   
    if (response.ok) {
        const responseJSON = await response.json()
        const imgURL = responseJSON.data.url
        console.log(imgURL)
    }
}
