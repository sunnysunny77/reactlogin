export default function Captcha() {

  const main = document.getElementById("mainCaptcha")
  const sub = document.getElementById("submit")
  const pass = document.getElementById("pass")
  const email = document.getElementById("email")

  sub.disabled = true
  pass.disabled = true
  email.disabled = true

  let alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  let i;

  let txt
  for (i = 0; i < 6; i++) {

    txt = alpha[Math.floor(Math.random() * alpha.length)];
    txt += alpha[Math.floor(Math.random() * alpha.length)];
    txt += alpha[Math.floor(Math.random() * alpha.length)];
    txt += alpha[Math.floor(Math.random() * alpha.length)];
    txt += alpha[Math.floor(Math.random() * alpha.length)];
    txt += alpha[Math.floor(Math.random() * alpha.length)];
    txt += alpha[Math.floor(Math.random() * alpha.length)];
  }

  main.innerHTML = txt
  main.value = txt
}