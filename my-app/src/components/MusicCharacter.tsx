import * as Tone from "tone";
import { useRef, useState, useEffect } from "react";
import { useBeat } from "./BeatContext";

type CharacterProps = {
    soundFile: string;
}

export function MusicCharacter({ soundFile}: CharacterProps) {

    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [pos, setPos] = useState({ x: 150, y: 150 });
    
    const audioTrack = useRef<Tone.Player | null>(null);

    const {beat, isPlaying, startPlaying, stopPlaying, activeTracks, increment, decrement} = useBeat();

    const [armed, setArmed] = useState(false);
    const [trackPlaying, setTrackPlaying] = useState(false);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setOffset({
            x: e.clientX - pos.x,
            y: e.clientY - pos.y
        });
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging) {
            setPos({
                x: e.clientX - offset.x,
                y: e.clientY - offset.y
            });
        };
    }

    const handleMouseUp = () => setIsDragging(false);  

    useEffect(() => {
        if (!audioTrack.current) {
            audioTrack.current = new Tone.Player({
                url: soundFile,
                loop: true,
                loopStart: 0,
                loopEnd: 15.36
        }).toDestination();
        }
        audioTrack.current.onstop = () => {
            console.log('stopped');
                setTrackPlaying(false);
                decrement();
                if (activeTracks <= 1) stopPlaying();
            };
        if (armed && isPlaying && audioTrack.current){
            if (beat === 1){
                audioTrack.current.loopStart = 0;
                audioTrack.current.loopEnd = 15.36;
                audioTrack.current.start();
                setArmed(false);
                setTrackPlaying(true);
                increment();
            }
            else if (beat > 1 && beat < 18){
                audioTrack.current.loopStart = 7.68;
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
    
    return <div onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} style= {{ position: 'absolute', left: pos.x, top: pos.y, cursor: isDragging ? 'grabbing' : 'grab' }}>
        <p>Track: {soundFile} {activeTracks}</p>
        <button onClick={playAudio}>Play Sound</button>;
    </div>
}
export default MusicCharacter;

