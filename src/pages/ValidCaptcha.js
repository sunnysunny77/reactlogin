export default function ValidCaptcha() {

    const sub = document.getElementById("submit")
    const pass = document.getElementById("pass")
    const email = document.getElementById("email")
    const cap = document.getElementById("responseCaptcha")
    const main = document.getElementById("mainCaptcha")
    const txt = document.getElementById('txtInput')
    const refresh = document.getElementById("refresh")
    const capsub = document.getElementById("captchaSubmit")

    let string1 = main.value;
    let string2 = txt.value;
    string1 = string1.split(' ').join('')
    string2 = string2.split(' ').join('')

    if (string1 === string2) {

        sub.disabled = false;
        pass.disabled = false;
        email.disabled = false;
        refresh.disabled = true;
        capsub.disabled = true;
        cap.innerHTML = "Correct";
    } else {

        sub.disabled = true;
        pass.disabled = true;
        email.disabled = true;
        cap.innerHTML = "Incorrect";

        setTimeout(function () {

            cap.innerHTML = "Please enter captcha";
        }, 2500)
    }
}
