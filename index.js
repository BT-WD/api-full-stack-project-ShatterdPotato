import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js"

const firebaseConfig = {
apiKey: "AIzaSyBFxE7Zpz6tPiEJQtzidxRpG3kr2ocjW5g",
authDomain: "hot-and-cold-81a78.firebaseapp.com",
projectId: "hot-and-cold-81a78",
storageBucket: "hot-and-cold-81a78.firebasestorage.app",
messagingSenderId: "107139806240",
appId: "1:107139806240:web:037f3851af00b443743845"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const dashboardView = document.getElementById("dashboard-view");
const loginView = document.getElementById("login-view")
const createView = document.getElementById("auth-view")
const api_key = "fa8348adfd7223a66deebf0baedd684f"

const fileInput = document.getElementById('file-input');
const chooseFileBtn = document.getElementById('choose-file-btn');

onAuthStateChanged(auth, (user) => {
    if (user) {
        dashboardView.style.display = "";
        loginView.style.display = "none"
        createView.style.display = "none"
    } else {
        dashboardView.style.display = "none"
        loginView.style.display = ""
        createView.style.display = "none"
    }
});

document.getElementById('logout-btn').addEventListener('click', () => {
    signOut(auth).then(() => {
        dashboardView.style.display = "none"
        loginView.style.display = ""
        createView.style.display = "none"
    }).catch((error) => {
        console.error(error.message)
    });
})

document.getElementById('signup-btn').addEventListener('click', () => {
    const email = document.getElementById("email-field-signup").value
    const pass = document.getElementById("pwd-field-signup").value
    createUserWithEmailAndPassword(auth, email, pass)
    .catch((error) => {
        console.error(error.message)
    });
    const usernameElement = document.getElementById("username");
    usernameElement.textContent = email; 
})

document.getElementById('signin-btn').addEventListener('click', () => {
    const email = document.getElementById("email-field-login").value
    const pass = document.getElementById("pwd-field-login").value
    signInWithEmailAndPassword(auth, email, pass)
    .catch((error) => {
        console.error(error.message)
    });
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
        try {
            console.log(getAuth(app).currentUser.UUID)
            const docRef = await addDoc(collection(db, "img_links"), {
                UUID: getAuth(app).currentUser.uid,
                link: imgURL
            });
        console.log(imgURL);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
}

