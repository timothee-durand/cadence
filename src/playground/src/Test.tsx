import {ReactNode} from "react";
import {Cadence, Loop} from "cadence-js";
import A3Piano from "./assets/samples/piano/A3.mp3"

const loop: Loop = {
    sample: A3Piano,
    interval: "1s",
    speed: 1
}


export function Test(): ReactNode {
    const cadence = new Cadence();

    function playLoop() {
        cadence.play(loop);
    }

    return (
        <button onClick={playLoop}>Play</button>
    )
}