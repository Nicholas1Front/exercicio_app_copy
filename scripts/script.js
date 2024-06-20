import { users } from "./userData.js";

//elements

const titleHTML = document.querySelector("#title-html")

const loginContainer = document.querySelector("#login-container");
const userContainer = document.querySelector("#user-container");

let userChecked = null;

const userEmail = document.querySelector("#user-email");
const userPassword = document.querySelector("#user-password");
const loginBtn = document.querySelector("#login-btn");
const loadingBtn = document.querySelector("#loading-btn");
const revealPasswordBtn = document.querySelector("#reveal-password-btn");
const hidePasswordBtn = document.querySelector("#hide-password-btn");
const loadingIcon = document.querySelector("#loading-icon");

const popupControl = document.querySelector("#popup-control");
const popupMessage = document.querySelector("#popup-message");
const closePopupBtn = document.querySelector("#close-popup-btn");

const backLoginControl = document.querySelector("#back-to-login-control");
const houseIcon = document.querySelector("#house-icon");
const backLoginText = document.querySelector("#back-login-text");

const userImg = document.querySelector("#user-img");
const userNameHTML = document.querySelector("#user-name-html");
const userEmailHTML = document.querySelector("#user-email-html");
const userPasswordHTML = document.querySelector("#user-password-html");
const revealPasswordHTML = document.querySelector("#reveal-password-html");
const hidePasswordHTML = document.querySelector("#hide-password-html");
const userGenderHTML = document.querySelector("#user-gender-html");
const userFromHTML = document.querySelector("#user-from-html");
//functions

function showPasswordLogin(){
    revealPasswordBtn.style.display = "none";
    hidePasswordBtn.style.display = "block";
    userPassword.setAttribute("type","text");
}

function hidePasswordLogin(){
    hidePasswordBtn.style.display = "none";
    revealPasswordBtn.style.display = "block";
    userPassword.setAttribute("type","password");
}

function showPopupLogin(){
    popupControl.style.opacity = "1"
    popupControl.style.transition = "0.5s";
}

function hidePopupLogin(){
    popupControl.style.opacity = "0"
    popupControl.style.transition = "0.5s";

}

function showPasswordUser(){
    revealPasswordHTML.style.display = "none";
    hidePasswordHTML.style.display = "flex";
    userPasswordHTML.style.backgroundColor = "#121212";
    userPasswordHTML.style.color = "white";
}


function hidePasswordUser(){
    hidePasswordHTML.style.display = "none";
    revealPasswordHTML.style.display = "flex";
    userPasswordHTML.style.backgroundColor = "#8a8989";
    userPasswordHTML.style.color = "#8a8989";
}

function showHideContainer(){
    loginContainer.classList.toggle("hide");
    userContainer.classList.toggle("hide");
}

function showLoadIcon(){
    loadingBtn.style.display = "flex";
    loginBtn.style.display = "none";
}

function hideLoadIcon(){
    loadingBtn.style.display = "none";
    loginBtn.style.display = "flex";
}

function checkandGetUser(users){

    let emailSelected = userEmail.value;
    let passwordSelected = userPassword.value;

    let userSelected = null;

    users.forEach(element => {

        if(emailSelected ==element.email && passwordSelected != element.password){
            userSelected = "Invalid password";
        }

        if (emailSelected == element.email && passwordSelected == element.password) {
            userSelected = {
                email: element.email,
                name: element.name,
                password: element.password,
                gender: element.gender,
                from : element.from,
            };
        }
    });

    if (userSelected == null) {
        userSelected = "User not finded";
    }

    return userSelected;

}

function loginProcess(){
    userChecked = checkandGetUser(users);

    if (userChecked == "Invalid password"){
        popupMessage.innerText = "Invalid password! Try again";
        showPopupLogin();
        setTimeout(function(){
            hidePopupLogin()
        },7000);

        return;
    }else if(userChecked == "User not finded"){
        popupMessage.innerText = "User not finded!";
        showPopupLogin();
        setTimeout(function(){
            hidePopupLogin()
        },7000);

        return;
    }else{
        showLoadIcon()

        popupMessage.innerText = "Login Sucessful!";
        popupControl.style.backgroundColor = "#7efc68";

        setTimeout(()=>{
            showPopupLogin();
        },1000)

        setTimeout(function(){
            
            hidePopupLogin();
        },7000);

        setTimeout(function(){
            showHideContainer();
            
            displayUserData(userChecked);
            loadingIcon.style.display = "none";
        },10000)
    }


    return userChecked;

}


function hoverInBackLogin(){
    houseIcon.style.color = "#8a4dfa";
    houseIcon.style.transition = "0.2s";
    backLoginText.style.opacity = "1";
    backLoginText.style.color = "#8a4dfa";
    backLoginText.style.marginTop = "1px";
    backLoginText.style.transition = "0.2s"
}

function hoverOutBackLogin(){
    houseIcon.style.color = "#8a8989";
    houseIcon.style.transition = "0.2s";
    backLoginText.style.opacity = "0";
    backLoginText.style.color = "##8a8989";
    backLoginText.style.marginTop = "-1px";
    backLoginText.style.transition = "0.2s"
}

function displayUserData(userChecked){
    // userImg.setAttribute("src", `images/${userChecked.name}.png`);
    userNameHTML.innerText = userChecked.name;
    userEmailHTML.innerText = userChecked.email;
    userPasswordHTML.innerText = userChecked.password;
    userFromHTML.innerText = userChecked.from;
    userGenderHTML.innerText = userChecked.gender;
}

//initialization


//events


loginBtn.addEventListener("click", function(event){
    event.preventDefault();

    loginProcess();

    titleHTML.innerText = "Profile | Copy";

});


closePopupBtn.addEventListener("click", function(event){
    event.preventDefault();

    hidePopupLogin();
})

revealPasswordBtn.addEventListener("click", function(event){
    event.preventDefault();

    showPasswordLogin();
})

hidePasswordBtn.addEventListener("click", function(event){
    event.preventDefault();

    hidePasswordLogin();
});

backLoginControl.addEventListener("mouseover",function(){
    hoverInBackLogin();
});

backLoginControl.addEventListener("mouseout",function(){
    hoverOutBackLogin();
});

backLoginControl.addEventListener("click",function(){
    showHideContainer();
    titleHTML.innerText = "Login | Copy";
    userChecked = null;
    hideLoadIcon();
    userEmail.innerHTML = "";
    userPassword.innerHTML = "";
});

revealPasswordHTML.addEventListener("click",function(){
    showPasswordUser();
});

hidePasswordHTML.addEventListener("click",function(){
    hidePasswordUser();
})

