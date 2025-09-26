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
        }).toDestination();

        }
        audioTrack.current.onstop = () => {
            console.log('stopped');
                setTrackPlaying(false);
                decrement();
                if (activeTracks <= 1) stopPlaying();
            };
        if (armed && isPlaying && beat === 1 && audioTrack.current){
            audioTrack.current.start();
            setArmed(false);
            setTrackPlaying(true);
            increment();
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
                increment();
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

