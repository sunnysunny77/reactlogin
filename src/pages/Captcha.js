export default function Captcha() {

  const canvas = document.getElementById("mainCaptcha")

  const alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

  let txt = ""

  for (let i = 1; i <= 7; i++) {

    txt += alpha[Math.floor(Math.random() * alpha.length)]
  }

  const context = canvas.getContext('2d')
  canvas.width = 200
  canvas.height  = 50
  context.font = '25px Bold'

  const randomColor = () => {

    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)

    return 'rgb(' + r + ',' + g + ',' + b + ')'
  }

  for (let i = 0; i < txt.length; i++) {

    const sDeg = (Math.random() * 30 * Math.PI) / 180
    const x = 10 + i * 20
    const y = 20 + Math.random() * 8

    context.translate(x, y)
    context.rotate(sDeg)
    context.fillStyle = randomColor()
    context.fillText(txt[i], 0, 0)
    context.rotate(-sDeg)
    context.translate(-x, -y)

    context.strokeStyle = randomColor();
    context.beginPath();
    context.moveTo(
      Math.random() * canvas.width,
      Math.random() * canvas.height
    )
    context.lineTo(
      Math.random() * canvas.width,
      Math.random() * canvas.height
    )
    context.stroke()
  }

  for (let i = 0; i < 30; i++) {

    context.strokeStyle = randomColor()
    context.beginPath()
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    context.moveTo(x, y)
    context.lineTo(x + 1, y + 1)
    context.stroke()
  }

  return txt
}