// Adding event listeners to compute the validity of email and password.
const email = document.querySelector("#email");
const password = document.querySelector("#password");
email.addEventListener("input", isEmailValid);
password.addEventListener("input", isPasswordValid);

// Function for validating the login
function validate() {
    emailValidity = isEmailValid(email.value);
    passwordValidity = isPasswordValid(password.value);
    return emailValidity && passwordValidity;
}

// Function for validating email
function isEmailValid() {
    const emailError = document.querySelector("#emailError");
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.value == "") {
        // SCENARIO 1: Empty email field
        email.placeholder = "Email field can not be empty.";
        emailError.innerHTML = "";
        return false;
    } else if (emailRegex.test(email.value)) {
        // SCENARIO 2: Valid email
        emailError.innerHTML = "";
        return true;
    } else {
        // SCENARIO 3: Invalid email
        emailError.innerHTML = "<p>STATUS : <strong class=\"text-danger\">Email is invalid.</strong></p>";
        return false;
    }
}

// Function for validating the password
function isPasswordValid() {
    const passwordError = document.querySelector("#passwordError");
    let passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,}$/;
    if (password.value == "") {
        // SCENARIO 1: Empty password field
        password.placeholder = "Password field can not be empty."
        passwordError.innerHTML = "";
        return false;
    } else if (password.value.length < 8) {
        // SCENARIO 2: Accepts all the necessary conditions,
        // but password length is less than 8 characters
        passwordError.innerHTML = "<p>STATUS : <strong class=\"text-danger\">Password is too short. Password must have 8 characters.</strong></p>"
        return false;
    } else if (passwordRegex.test(password.value)) {
        // SCENARIO 3: Valid password
        passwordError.innerHTML = "";
        return true;
    } else {
        // SCENARIO 4: Invalid password
        passwordError.innerHTML = "<p>STATUS : <strong class=\"text-danger\">Password must contain atleast 1 capital letter, 1 small letter and 1 digit.</strong></p>";
        return false;
    }
}