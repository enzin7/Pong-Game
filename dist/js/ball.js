//--- Import's ---
import { pressedKeys, paddleLeft, paddleRigth } from "./paddles.js";
import { scorePlayer1, scorePlayer2 } from "./score.js";
//--- Elementos do DOM ---
export const ball = document.getElementById("ball");
export const info = document.querySelector(".info");
export const court = document.querySelector(".court");
//--- Variáveis Globais ---
let ballX = court.offsetWidth / 2;
let ballY = court.offsetHeight / 2;
let veloX = 2.5;
let veloY = 1;
let ballSize = 18;
let direcaoX = 1;
let jogando = true;
let comecou = false;
let ganhou = false;
const colisao = new Audio("/Pong/dist/sound/paddleBounce.mp3");
//--- Funções ---
export function atualizarPosicoesBall() {
    ball.style.top = `${ballY}px`;
    ball.style.left = `${ballX}px`;
}
export function moverBola() {
    if (getGanhou())
        return;
    if (getJogando()) {
        ballX += veloX;
        ballY += veloY;
        if (ballY <= 0 || ballY + ballSize >= court.offsetHeight) {
            colisao.play();
            veloY = -veloY;
        }
        if (ballX + ballSize <= 0)
            scorePlayer2();
        if (ballX >= court.offsetWidth)
            scorePlayer1();
        atualizarPosicoesBall();
        detectarColisao();
    }
    requestAnimationFrame(moverBola);
}
export function resetar() {
    ballY = 250;
    ballX = 438;
    direcaoX *= -1;
    veloX = 2.5 * direcaoX;
    veloY = 1 * (Math.random() > 0.5 ? 1 : -1);
    atualizarPosicoesBall();
}
export function detectarColisao() {
    const reactBall = ball.getBoundingClientRect();
    const reactLeft = paddleLeft.getBoundingClientRect();
    const reactRigth = paddleRigth.getBoundingClientRect();
    if (reactBall.left <= reactLeft.right &&
        reactBall.bottom >= reactLeft.top &&
        reactBall.top <= reactLeft.bottom &&
        veloX < 0) {
        veloX = Math.abs(veloX);
        colisao.play();
    }
    if (reactBall.right >= reactRigth.left &&
        reactBall.bottom >= reactRigth.top &&
        reactBall.top <= reactRigth.bottom &&
        veloX > 0) {
        veloX = -Math.abs(veloX);
        colisao.play();
    }
}
export function play() {
    if (getComecou())
        return;
    if (pressedKeys["KeyW"] ||
        pressedKeys["KeyS"] ||
        pressedKeys["ArrowUp"] ||
        pressedKeys["ArrowDown"]) {
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
export function setGanhou(value) {
    ganhou = value;
}
export function getGanhou() {
    return ganhou;
}
export function setJogando(value) {
    jogando = value;
}
export function getJogando() {
    return jogando;
}
export function setComecou(value) {
    comecou = value;
}
export function getComecou() {
    return comecou;
}
