//--- Import's ---
import { pause, reiniciar } from "./auxiliaries.js";
import { play } from "./ball.js";
import { moverPaddles, pressedKeys } from "./paddles.js";

moverPaddles();

document.addEventListener("keydown", (event) => {
  pressedKeys[event.code] = true;
  play();
});

document.addEventListener("keyup", (event) => {
  pressedKeys[event.code] = false;
});

document.getElementById("reiniciar").addEventListener("click", reiniciar);
document.getElementById("pausar").addEventListener("click", pause);
