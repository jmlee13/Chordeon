import * as Tone from "tone";
import { useRef, useState, useEffect } from "react";
import { useBeat } from "./BeatContext";

type CharacterProps = {
    width?: number;
    height?: number;
}

export function MusicCharacter({ }: CharacterProps) {
    const audioTrack = useRef<Tone.Player | null>(null);

    const {beat, isPlaying, startPlaying, stopPlaying, activeTracks, increment, decrement} = useBeat();

    const [armed, setArmed] = useState(false);
    const [trackPlaying, setTrackPlaying] = useState(false);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const soundFile = e.dataTransfer.getData('soundFile');
        if (soundFile){
            setArmed(false);
            setTrackPlaying(false);
            if (audioTrack.current){
                audioTrack.current.dispose();
            }
            audioTrack.current = new Tone.Player({
                url: soundFile,
                loop: true,
                loopStart: 0,
                loopEnd: 15.36
            }).toDestination();
            audioTrack.current.onstop = () => {
            console.log('stopped');
                setTrackPlaying(false);
                decrement();
                if (activeTracks <= 1) stopPlaying();
                
            };
        }
    };

    useEffect(() => {
        if (!audioTrack.current || !armed) return;
        if (isPlaying){
            if (beat === 1){
                audioTrack.current.loopStart = 0;
                audioTrack.current.loopEnd = 15.36;
                audioTrack.current.start();
                setArmed(false);
                setTrackPlaying(true);
                increment();
            }
            else if (beat > 1 && beat < 18){
                audioTrack.current.loopStart = 7.695;
                audioTrack.current.loopEnd = 15.36;
                if (beat === 17){
                    audioTrack.current.start();
                    setArmed(false);
                    setTrackPlaying(true);
                    increment();
                    audioTrack.current.loopStart = 0;
                    audioTrack.current.loopEnd = 15.36;
                }
            }
        }
    }, [beat, isPlaying, armed])

    const playAudio = async () => {
        await Tone.start();
        console.log(`isPlaying: ${isPlaying}`);
        if (!trackPlaying){
            setArmed(true);
            if(!isPlaying){
                startPlaying();
                setTrackPlaying(true);
                console.log(`Armed: ${armed}`);
            }
        }
        else {
            audioTrack.current?.stop()
        }
    };
    
    return <div onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} className="m-10 p-4 bg-black outline-blue-300">
        <p className="text-green-500">Drag and Drop</p>
        <button onClick={playAudio}>Play Sound</button>
    </div>
}
export default MusicCharacter;

