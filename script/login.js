const email = document.querySelector("#email");
const password = document.querySelector("#password");
email.addEventListener("input", isEmailValid);
password.addEventListener("input", isPasswordValid);

function validate() {
    emailValidity = isEmailValid(email.value);
    passwordValidity = isPasswordValid(password.value);
    return emailValidity && passwordValidity;
}

function isEmailValid() {
    const emailError = document.querySelector("#emailError");
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.value == "") {
        email.placeholder = "Email field can not be empty.";
        emailError.innerHTML = "";
        return false;
    } else if (emailRegex.test(email.value)) {
        emailError.innerHTML = "";
        return true;
    } else {
        emailError.innerHTML = "<p>STATUS : <strong class=\"text-danger\">Email is invalid.</strong></p>";
        return false;
    }
}

function isPasswordValid() {
    const passwordError = document.querySelector("#passwordError");
    let passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,}$/;
    if (password.value == "") {
        password.placeholder = "Password field can not be empty."
        passwordError.innerHTML = "";
        return false;
    } else if (password.value.length < 8) {
        passwordError.innerHTML = "<p>STATUS : <strong class=\"text-danger\">Password is too short. Password must have 8 characters.</strong></p>"
        return false;
    } else if (passwordRegex.test(password.value)) {
        passwordError.innerHTML = "";
        return true;
    } else {
        passwordError.innerHTML = "<p>STATUS : <strong class=\"text-danger\">Password must contain atleast 1 capital letter, 1 small letter and 1 digit.</strong></p>";
        return false;
    }
}