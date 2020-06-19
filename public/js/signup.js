// Adding event listeners to compute the validity of email, phone number, password, confirm password.
const email = document.querySelector("#email");
const phoneNumber = document.querySelector("#phoneNumber");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");

email.addEventListener("input", isEmailValid);
phoneNumber.addEventListener("input", isPhoneNumberValid);
password.addEventListener("input", isPasswordValid);
confirmPassword.addEventListener("input", isConfirmPasswordValid);

// Adding event listeners to compute the strength of both password and confirm password
const typePassword = document.querySelectorAll(".typePassword");
const strengthMeter = document.querySelectorAll(".strengthMeter");
const strengthStatus = document.querySelectorAll(".strengthStatus");

typePassword[0].addEventListener("input", checkPasswordStrength);
typePassword[1].addEventListener("input", checkPasswordStrength);

// Function for validating the signup form
function validate() {
    let emailValidity = isEmailValid();
    let phoneNumberValidity = isPhoneNumberValid();
    let passwordValidity = isPasswordValid();
    let confirmPasswordValidity = isConfirmPasswordValid();
    return emailValidity && phoneNumberValidity && passwordValidity && confirmPasswordValidity;
}

// Function for validating the email
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

// Function for checking the validity of the phone number
function isPhoneNumberValid() {
    const phoneNumberError = document.querySelector("#phoneNumberError");
    let phoneNumberRegex = /^\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})$/;
    if (phoneNumber.value == "") {
        // SCENARIO 1: Empty phone number field
        phoneNumber.placeholder = "Phone number field can not be empty.";
        phoneNumberError.innerHTML = "";
        return false;
    } else if (phoneNumberRegex.test(phoneNumber.value) && phoneNumber.value.length == 10) {
        // SCENARIO 2: Valid phone number, but format is incorrect
        phoneNumberError.innerHTML = "<p>STATUS : <strong class=\"text-danger\">Format is (XXX)-XXX-XXXX.(space or . also allowed in place of -, and () at the first part is optional.)</strong></p>";
        return false;
    } else if (phoneNumberRegex.test(phoneNumber.value) && phoneNumber.value.length > 10) {
        // SCENARIO 3: Valid phone number
        phoneNumberError.innerHTML = "";
        return true;
    } else {
        // SCENARIO 4: Invalid phone number
        phoneNumberError.innerHTML = "<p>STATUS : <strong class=\"text-danger\">Phone number is invalid.</strong></p>";
        return false;
    }
}

// Function for checking the validity of the password
function isPasswordValid() {
    const passwordError = document.querySelector("#passwordError");
    let passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,}$/;
    if (password.value == "") {
        // SCENARIO 1: Empty password field
        password.placeholder = "Password field can not be empty.";
        passwordError.innerHTML = "";
        return false;
    } else if (password.value.length < 8) {
        // SCENARIO 2: Accepts all the necessary conditions,
        // but password length is less than 8 characters
        passwordError.innerHTML = "<p>STATUS : <strong class=\"text-danger\">Password must have atleast 8 characters.</strong></p>";
        return false;
    } else if (passwordRegex.test(password.value)) {
        // SCENARIO 3: Valid password
        passwordError.innerHTML = "";
        return true;
    } else {
        // SCENARIO 4: Invalid password
        passwordError.innerHTML = "<p>STATUS : <strong class=\"text-danger\">Password must contain atleast 1 capital letter, 1 small letter, and 1 digit.</strong></p>";
        return false;
    }
}

// Function for checking whether the confirm password field
// is equivalent to the password field or not.
function isConfirmPasswordValid() {
    const confirmPasswordError = document.querySelector("#confirmPasswordError");
    if (confirmPassword.value == "") {
        // SCENARIO 1: Empty confirm password field
        confirmPassword.placeholder = "Confirm password field can not be empty.";
        confirmPasswordError.innerHTML = "";
        return false;
    } else if (confirmPassword.value === password.value) {
        // SCENARIO 2: Both password and confirm password fields are same
        confirmPasswordError.innerHTML = "";
        return true;
    } else {
        // SCENARIO 3: Confirm password field is not equivalent with password field
        confirmPasswordError.innerHTML = "<p>STATUS : <strong class=\"text-danger\">Both passwords doesn't matches.</strong></p>";
        return false;
    }
}

// Function for checking the password strength
function checkPasswordStrength() {
    let regexArray = [];
    let count0 = 0, count1 = 0;

    // Regular Expression for confirming the presence of atleast one number
    regexArray.push(/(?=.*\d)/);
    // Regular Expression for confirming the presence of atleast one upper case letter
    regexArray.push(/(?=.*[A-Z])/);
    // Regular Expression for confirming the presence of atleast one lower case letter
    regexArray.push(/(?=.*[a-z])/);
    // Regular Expression for confirming that password is having size atleast 8 characters
    regexArray.push(/(?=.{8,})/);

    for (let i = 0; i < regexArray.length; i++) {
        if (regexArray[i].test(typePassword[0].value)) {
            count0++;
        }
        if (regexArray[i].test(typePassword[1].value)) {
            count1++;
        }
    }
    switchingStatus(count0, 0);
    switchingStatus(count1, 1);
}

// Function for updating strength meter, and status
function switchingStatus(count, index) {
    switch (count) {
        case 0:
            strengthMeter[index].value = 0;
            strengthStatus[index].innerHTML = "";
            break;
        case 1:
            strengthMeter[index].value = 1;
            strengthStatus[index].innerHTML = "<span class=\"text-danger\">Poor</span>";
            break;
        case 2:
            strengthMeter[index].value = 2;
            strengthStatus[index].innerHTML = "<span style=\"color: orange\">Weak</span>";
            break;
        case 3:
            strengthMeter[index].value = 3;
            strengthStatus[index].innerHTML = "<span class=\"text-warning\">Medium</span>";
            break;
        case 4:
            strengthMeter[index].value = 4;
            strengthStatus[index].innerHTML = "<span class=\"text-success\">Strong</span>";
            break;
        default:
            break;
    }
}