//--- Import's ---
import { resetar, setGanhou, setJogando } from "./ball.js";

//--- Elementos do DOM ---
export const scoreP1: HTMLElement = document.getElementById("scoreP1");
export const scoreP2: HTMLElement = document.getElementById("scoreP2");
export const messageWin: HTMLElement = document.querySelector(".message-box");

//--- Variáveis Globais ---
let score1: number = 9;
let score2: number = 0;
const points: HTMLAudioElement = new Audio("/Pong/dist/sound/points.mp3");

//--- Funções ---
export function scorePlayer1(): void {
  score1++;
  scoreP1.textContent = String(score1);
  points.play();

  ganhador();
  resetar();
}

export function scorePlayer2(): void {
  score2++;
  scoreP2.textContent = String(score2);
  points.play();

  ganhador();
  resetar();
}

export function ganhador(): void {
  if (score1 >= 10 || score2 >= 10) {
    messageWin.style.opacity = "1";
    setGanhou(true);
    setJogando(false);
  }

  if (scoreP1.textContent === "10") {
    messageWin.style.left = "75px";
  } else if (scoreP2.textContent === "10") {
    messageWin.style.left = "510px";
  }
}
