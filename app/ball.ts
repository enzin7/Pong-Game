//--- Import's ---
import { pressedKeys, paddleLeft, paddleRigth } from "./paddles.js";
import { scorePlayer1, scorePlayer2 } from "./score.js";

//--- Elementos do DOM ---
export const ball: HTMLElement = document.getElementById("ball");
export const info: HTMLElement = document.querySelector(".info");
export const court: any = document.querySelector(".court");

//--- Variáveis Globais ---
let ballX: number = court.offsetWidth / 2;
let ballY: number = court.offsetHeight / 2;
let veloX: number = 2.5;
let veloY: number = 1;
let ballSize: number = 18;
let direcaoX: number = 1;
let jogando: boolean = true;
let comecou: boolean = false;
let ganhou: boolean = false;
const colisao: HTMLAudioElement = new Audio(
  "/Pong/dist/sound/paddleBounce.mp3"
);

//--- Funções ---
export function atualizarPosicoesBall(): void {
  ball.style.top = `${ballY}px`;
  ball.style.left = `${ballX}px`;
}

export function moverBola(): void {
  if (getGanhou()) return;

  if (getJogando()) {
    ballX += veloX;
    ballY += veloY;

    if (ballY <= 0 || ballY + ballSize >= court.offsetHeight) {
      colisao.play();

      veloY = -veloY;
    }

    if (ballX + ballSize <= 0) scorePlayer2();

    if (ballX >= court.offsetWidth) scorePlayer1();

    atualizarPosicoesBall();
    detectarColisao();
  }
  requestAnimationFrame(moverBola);
}

export function resetar(): void {
  ballY = 250;
  ballX = 438;

  direcaoX *= -1;

  veloX = 2.5 * direcaoX;
  veloY = 1 * (Math.random() > 0.5 ? 1 : -1);

  atualizarPosicoesBall();
}

export function detectarColisao(): void {
  const reactBall: DOMRect = ball.getBoundingClientRect();
  const reactLeft: DOMRect = paddleLeft.getBoundingClientRect();
  const reactRigth: DOMRect = paddleRigth.getBoundingClientRect();

  if (
    reactBall.left <= reactLeft.right &&
    reactBall.bottom >= reactLeft.top &&
    reactBall.top <= reactLeft.bottom &&
    veloX < 0
  ) {
    veloX = Math.abs(veloX);
    colisao.play();
  }

  if (
    reactBall.right >= reactRigth.left &&
    reactBall.bottom >= reactRigth.top &&
    reactBall.top <= reactRigth.bottom &&
    veloX > 0
  ) {
    veloX = -Math.abs(veloX);
    colisao.play();
  }
}

export function play(): void {
  if (getComecou()) return;

  if (
    pressedKeys["KeyW"] ||
    pressedKeys["KeyS"] ||
    pressedKeys["ArrowUp"] ||
    pressedKeys["ArrowDown"]
  ) {
    info.style.opacity = "0";
    setTimeout(() => {
      info.textContent = "Faça 10 pontos para ganhar o jogo!";
      info.style.opacity = "1";
    }, 500);
    setComecou(true);
    moverBola();
  }
}

//--- GET e SET ---
export function setGanhou(value: boolean): void {
  ganhou = value;
}

export function getGanhou(): boolean {
  return ganhou;
}

export function setJogando(value: boolean): void {
  jogando = value;
}

export function getJogando(): boolean {
  return jogando;
}

export function setComecou(value: boolean): void {
  comecou = value;
}

export function getComecou(): boolean {
  return comecou;
}
