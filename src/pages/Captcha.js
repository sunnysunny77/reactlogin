export default function Captcha() {

  const main = document.getElementById("mainCaptcha")
  const alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let txt = ""

  for (let i = 0; i < 6; i++) {

    txt = alpha[Math.floor(Math.random() * alpha.length)];
    txt += alpha[Math.floor(Math.random() * alpha.length)];
    txt += alpha[Math.floor(Math.random() * alpha.length)];
    txt += alpha[Math.floor(Math.random() * alpha.length)];
    txt += alpha[Math.floor(Math.random() * alpha.length)];
    txt += alpha[Math.floor(Math.random() * alpha.length)];
    txt += alpha[Math.floor(Math.random() * alpha.length)];
  }

  const ctx = main.getContext("2d");
  
  ctx.clearRect(0, 0, main.width, main.height);
  ctx.font = "50px Arial";
  ctx.fillText(txt, 10, 100);

  return txt
}