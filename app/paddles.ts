import { getGanhou, getJogando } from "./ball.js";

//--- Elementos do DOM ---
export const paddleLeft: HTMLElement = document.getElementById("paddle-left");
export const paddleRigth: HTMLElement = document.getElementById("paddle-right");

//--- Variáveis Globais ---
export const pressedKeys: Record<string, boolean> = {};
let paddleLeftY: number = 200;
let paddleRigthY: number = 200;
const speed: number = 1.5;

//--- Funções ---
function atualizarPosicoes(): void {
  paddleLeft.style.top = `${paddleLeftY}px`;
  paddleRigth.style.top = `${paddleRigthY}px`;
}

export function moverPaddles(): void {
  if (getGanhou()) return;

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
