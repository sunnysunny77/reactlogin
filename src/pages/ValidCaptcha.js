export default function ValidCaptcha(captcha) {

    const sub = document.getElementById("submit")
    const pass = document.getElementById("pass")
    const email = document.getElementById("email")
    const cap = document.getElementById("responseCaptcha")
    const txt = document.getElementById('txtInput')
    const refresh = document.getElementById("refresh")
    const capsub = document.getElementById("captchaSubmit")

    let string = txt.value;
    string = string.split(' ').join('')

    if (string === captcha) {

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
