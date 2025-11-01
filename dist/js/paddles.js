import { getGanhou, getJogando } from "./ball.js";
//--- Elementos do DOM ---
export const paddleLeft = document.getElementById("paddle-left");
export const paddleRigth = document.getElementById("paddle-right");
//--- Variáveis Globais ---
export const pressedKeys = {};
let paddleLeftY = 200;
let paddleRigthY = 200;
const speed = 1.5;
//--- Funções ---
function atualizarPosicoes() {
    paddleLeft.style.top = `${paddleLeftY}px`;
    paddleRigth.style.top = `${paddleRigthY}px`;
}
export function moverPaddles() {
    if (getGanhou())
        return;
    if (getJogando) {
        if (pressedKeys["KeyW"]) {
            if (paddleLeftY >= 0) {
                paddleLeftY -= speed;
            }
        }
        if (pressedKeys["KeyS"]) {
            if (paddleLeftY <= 415) {
                paddleLeftY += speed;
            }
        }
        if (pressedKeys["ArrowUp"]) {
            if (paddleRigthY >= 0) {
                paddleRigthY -= speed;
            }
        }
        if (pressedKeys["ArrowDown"]) {
            if (paddleRigthY <= 415) {
                paddleRigthY += speed;
            }
        }
        atualizarPosicoes();
    }
    requestAnimationFrame(moverPaddles);
}
