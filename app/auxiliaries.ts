//--- Import's ---
import { getComecou, getJogando, play, setJogando } from "./ball.js";

//--- Elementos do DOM ---
const pausar: HTMLElement = document.getElementById("pausar");

//--- Funções ---
export function reiniciar(): void {
  window.location.reload();
}

export function pause(): void {
  if (!getComecou()) return;

  setJogando(!getJogando());

  if (!getJogando()) {
    pausar.textContent = "PAUSADO";
    pausar.title = "Clique para Despausar";
  } else if (getJogando()) {
    pausar.textContent = "PAUSAR";
    pausar.title = "Clique para Pausar o Jogo";
  }
}
