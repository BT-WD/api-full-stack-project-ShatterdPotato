import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";

const firebaseConfig = {
apiKey: "AIzaSyBFxE7Zpz6tPiEJQtzidxRpG3kr2ocjW5g",
authDomain: "hot-and-cold-81a78.firebaseapp.com",
projectId: "hot-and-cold-81a78",
storageBucket: "hot-and-cold-81a78.firebasestorage.app",
messagingSenderId: "107139806240",
appId: "1:107139806240:web:037f3851af00b443743845"
};

const app = initializeApp(firebaseConfig);
const dashboardView = document.getElementById("dashboard-view");
const api_key = "fa8348adfd7223a66deebf0baedd684f"

const fileInput = document.getElementById('file-input');
const chooseFileBtn = document.getElementById('choose-file-btn');
document.getElementById('logout-btn').addEventListener('click', () => {
    document.getElementById("login-view").style.display = "";
    dashboardView.style.display = "none";
})

document.getElementById('signup-btn').addEventListener('click', () => {
    document.getElementById('auth-view').style.display = "none"
    dashboardView.style.display = "block";
    const email = document.getElementById("email-field").value
    const usernameElement = document.getElementById("username");
    usernameElement.textContent = email; 
})

document.getElementById('signin-btn').addEventListener('click', () => {
    document.getElementById("login-view").style.display = "none"
    dashboardView.style.display = "block";
    const email = document.getElementById("email-field").value
    const usernameElement = document.getElementById("username");
    usernameElement.textContent = email; 
})

document.getElementById('signin-link').addEventListener('click', () => {
    document.getElementById("login-view").style.display = ""
    document.getElementById("auth-view").style.display = "none"
})

document.getElementById('signup-link').addEventListener('click', () => {
    document.getElementById("login-view").style.display = "none"
    document.getElementById("auth-view").style.display = ""
})

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

