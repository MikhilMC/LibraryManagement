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
//const passwordGroup = document.querySelectorAll(".passwordGroup");
const typePassword = document.querySelectorAll(".typePassword");
const strengthMeter = document.querySelectorAll(".strengthMeter");
const strengthStatus = document.querySelectorAll(".strengthStatus");

typePassword[0].addEventListener("input", checkPasswordStrength);
typePassword[1].addEventListener("input", checkPasswordStrength);

function validate() {
    let emailValidity = isEmailValid();
    let phoneNumberValidity = isPhoneNumberValid();
    let passwordValidity = isPasswordValid();
    let confirmPasswordValidity = isConfirmPasswordValid();
    return emailValidity && phoneNumberValidity && passwordValidity && confirmPasswordValidity;
}

function isEmailValid() {
    const emailError = document.querySelector("#emailError");
    let emailRegex = /^([\w\-.]+)@([A-Za-z0-9\-]+).([a-z]{2,3})(.[a-z]{2,3})?$/;
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

function isPhoneNumberValid() {
    const phoneNumberError = document.querySelector("#phoneNumberError");
    let phoneNumberRegex = /^\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})$/;
    if (phoneNumber.value == "") {
        phoneNumber.placeholder = "Phone number field can not be empty.";
        phoneNumberError.innerHTML = "";
        return false;
    } else if (phoneNumberRegex.test(phoneNumber.value) && phoneNumber.value.length == 10) {
        phoneNumberError.innerHTML = "<p>STATUS : <strong class=\"text-danger\">Format is (XXX)-XXX-XXXX.(space or . also allowed in place of -, and () at the first part is optional.)</strong></p>";
        return false;
    } else if (phoneNumberRegex.test(phoneNumber.value) && phoneNumber.value.length > 10) {
        phoneNumberError.innerHTML = "";
        return true;
    } else {
        phoneNumberError.innerHTML = "<p>STATUS : <strong class=\"text-danger\">Phone number is invalid.</strong></p>";
        return false;
    }
}

function isPasswordValid() {
    const passwordError = document.querySelector("#passwordError");
    let passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,}$/;
    if (password.value == "") {
        password.placeholder = "Password field can not be empty.";
        passwordError.innerHTML = "";
        return false;
    } else if (password.value.length < 8) {
        passwordError.innerHTML = "<p>STATUS : <strong class=\"text-danger\">Password must have atleast 8 characters.</strong></p>";
        return false;
    } else if (passwordRegex.test(password.value)) {
        passwordError.innerHTML = "";
        return true;
    } else {
        passwordError.innerHTML = "<p>STATUS : <strong class=\"text-danger\">Password must contain atleast 1 capital letter, 1 small letter, and 1 digit.</strong></p>";
        return false;
    }
}

function isConfirmPasswordValid() {
    const confirmPasswordError = document.querySelector("#confirmPasswordError");
    if (confirmPassword.value == "") {
        confirmPassword.placeholder = "Confirm password field can not be empty.";
        confirmPasswordError.innerHTML = "";
        return false;
    } else if (confirmPassword.value === password.value) {
        confirmPasswordError.innerHTML = "";
        return true;
    } else {
        confirmPasswordError.innerHTML = "<p>STATUS : <strong class=\"text-danger\">Both passwords doesn't matches.</strong></p>";
        return false;
    }
}

function checkPasswordStrength() {
    let regexArray = [];
    let count0 = 0, count1 = 0;

    regexArray.push(/(?=.*\d)/);
    regexArray.push(/(?=.*[A-Z])/);
    regexArray.push(/(?=.*[a-z])/);
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