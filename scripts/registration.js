function newUser() {

    let submitButton = document.getElementsByTagName('button')[0];
    console.log(submitButton);
    submitButton.addEventListener("click", () => {
        let userRegex = new RegExp(/[A-z]{1}[A-z0-9_]{2,24}/);
        let nameRegex = new RegExp(/[a-zA-Z]{2,}/);
        let passRegex = new RegExp(/[\S+]{6,24}/);
        let firstName = document.getElementById('regFirst');
        let lastName = document.getElementById('regLast');
        let user = document.getElementById('regUser');
        let pass = document.getElementById('regPass');
        let passRep = document.getElementById('regPassRep');
        let firstGood = false;
        let lastGood = false;
        let userGood = false;
        let passGood = false;
        let passRepGood = false;

        if (nameRegex.test(firstName.value) == false) {
            let fnError = document.getElementById('fnError');
            fnError.style.display = "block";
        } else {
            let fnError = document.getElementById('fnError');
            fnError.style.display = "none";
            firstGood = true;
        }

        if (nameRegex.test(lastName.value) == false) {
            let lnError = document.getElementById('lnError');
            lnError.style.display = "block";
        } else {
            let lnError = document.getElementById('lnError');
            lnError.style.display = "none";
            lastGood = true;
        }

        if (userRegex.test(user.value) == false) {
            let usernameError = document.getElementById('usernameError');
            usernameError.style.display = "block";
        } else {
            let usernameError = document.getElementById('usernameError');
            usernameError.style.display = "none";
            userGood = true;
        }

        if (passRegex.test(pass.value) == false) {
            let passError = document.getElementById('passError');
            passError.style.display = "block";
        } else {
            let passError = document.getElementById('passError');
            passError.style.display = "none";
            passGood = true;
        }


        if (passRep.value === pass.value) {
            let passRep = document.getElementById('passRepError');
            passRep.style.display = "block";
        } else {
            let passRep = document.getElementById('passErrorRep');
            passRep.style.display = "none";
            passRepGood = true;
        }
        


        console.log("test");
    });

}