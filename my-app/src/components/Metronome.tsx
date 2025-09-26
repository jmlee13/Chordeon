import { useEffect, useRef, useState } from 'react'
import * as Tone from "tone";
import { useBeat } from "./BeatContext";
import MusicCharacter from "./MusicCharacter";

type MetronomeProps = {
    bpm?: number;
}

export function Metronome({bpm = 125}: MetronomeProps) {
    const { beat, isPlaying, setBeat} = useBeat();
    const loopRef = useRef<Tone.Loop | null>(null);
    
    useEffect(() => {
        if (isPlaying) {
            Tone.start();
            loopRef.current = new Tone.Loop(() => {
                setBeat((prev) => (prev + 1) % 32);
            }, "4n");
            Tone.Transport.bpm.value = bpm;
            loopRef.current.start(0);
            Tone.Transport.start("+0.1");
        }
        else {
            Tone.Transport.stop();
            loopRef.current?.dispose();
        }
    }, [isPlaying, bpm, setBeat]);

    return (
        <p>Beat: {beat} / 32</p>
    )
}

export default Metronome;