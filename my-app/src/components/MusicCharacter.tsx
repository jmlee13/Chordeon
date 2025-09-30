import * as Tone from "tone";
import { useRef, useState } from "react";
import { useBeat } from "./BeatContext";
import WaveformSVG from "./WaveformSVG";


export function MusicCharacter() {
    const audioTrack = useRef<Tone.Player | null>(null);

    const { beat, isPlaying, startPlaying, stopPlaying, activeTracks, increment, decrement } = useBeat();

    const [armed, setArmed] = useState(false);
    const [trackPlaying, setTrackPlaying] = useState(false);

    const [currentTrack, setCurrentTrack] = useState<string | null>("");
    const [currentStroke, setCurrentStroke] = useState<string>("");

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.getData('soundFile');
        const droppedStroke = e.dataTransfer.getData('strokeColor');

        if (!droppedFile) {
            console.log('dropped file not detected');
            return;
        }
        if (audioTrack.current && audioTrack.current.state === 'started') {
            return;
        }
        setCurrentTrack(droppedFile);
        console.log('set current track to:', droppedFile)
        setCurrentStroke(droppedStroke);
        console.log(`soundFile transferred to currentTrack: ${droppedFile}`);
        console.log('stroke:', droppedStroke);
        setArmed(false);
        setTrackPlaying(false);
        increment();


        audioTrack.current = new Tone.Player({
            url: droppedFile,
            loop: true,
            loopStart: 0,
            loopEnd: 15.36,
            volume: -2,
            onload: () => {
                startPlaying();
                audioTrack.current?.sync().start(0);
                console.log('audio played');
            }
        }).toDestination();
        audioTrack.current.onstop = () => {
            console.log('stopped');
            setTrackPlaying(false);
            decrement();
            if (activeTracks < 1) stopPlaying();
        };
    };

    const handleDelete = () => {
        audioTrack.current?.dispose();
        setCurrentStroke('');
    }

    const handleMute = () => {
        if (audioTrack.current) {
            audioTrack.current.mute = !audioTrack.current.mute;
        }
    }

    return (
        <div>
            <div className="w-[200px] h-[200px] flex justify-center items-center rounded-3xl border-8 border-black p-4" style={{ backgroundColor: currentStroke || "#4d4d4d" }} onClick={handleDelete} onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
                <WaveformSVG player={audioTrack.current} stroke={currentStroke} />
            </div>
            <img src="/icons/microphone.png" className="muteButton h-16 w-auto " onClick={handleMute}></img>
        </div>
    )
}

export default MusicCharacter;