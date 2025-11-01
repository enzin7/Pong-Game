//--- Import's ---
import { getComecou, getJogando, setJogando } from "./ball.js";
//--- Elementos do DOM ---
const pausar = document.getElementById("pausar");
//--- Funções ---
export function reiniciar() {
    window.location.reload();
}
export function pause() {
    if (!getComecou())
        return;
    setJogando(!getJogando());
    if (!getJogando()) {
        pausar.textContent = "PAUSADO";
        pausar.title = "Clique para Despausar";
    }
    else if (getJogando()) {
        pausar.textContent = "PAUSAR";
        pausar.title = "Clique para Pausar o Jogo";
    }
}
