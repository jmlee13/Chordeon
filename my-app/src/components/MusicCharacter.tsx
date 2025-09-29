import * as Tone from "tone";
import { useRef, useState, useEffect } from "react";
import { useBeat } from "./BeatContext";
import WaveformSVG from "./WaveformSVG";


export function MusicCharacter() {
    const audioTrack = useRef<Tone.Player | null>(null);

    const { beat, isPlaying, startPlaying, stopPlaying, activeTracks, increment, decrement} = useBeat();

    const [armed, setArmed] = useState(false);
    const [trackPlaying, setTrackPlaying] = useState(false);

    const [currentTrack, setCurrentTrack] = useState<string>("");
    const [currentStroke, setCurrentStroke] = useState<string>("");

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.getData('soundFile');
        const droppedStroke = e.dataTransfer.getData('strokeColor');
        setCurrentTrack(droppedFile);
        setCurrentStroke(droppedStroke);
        console.log(`soundFile transferred to currentTrack: ${currentTrack}`);
        if (droppedFile) {
            setArmed(false);
            setTrackPlaying(false);
            increment();
            if (audioTrack.current) {
                audioTrack.current.dispose();
            }
            audioTrack.current = new Tone.Player({
                url: droppedFile,
                loop: true,
                loopStart: 0,
                loopEnd: 15.36,
            }).toDestination();
            console.log('audiotrack.current created');
            
            audioTrack.current.onstop = () => {
                console.log('stopped');
                setTrackPlaying(false);
                decrement();
                if (activeTracks < 1) stopPlaying();
            };
        }
        playAudio();
        console.log('audio played');
    };

    const playAudio = async () => {
        await Tone.start();
        console.log(`isPlaying: ${isPlaying}`);
        if (!trackPlaying) {
            setArmed(true);
            if (!isPlaying) {
                startPlaying();
                setTrackPlaying(true);
                console.log(`Armed: ${armed}`);
            }
        }
        else {
            console.log('stopped');
            audioTrack.current?.stop()
        }
    };    

    useEffect(() => {
        if (!audioTrack.current || !armed) {
            return;
        }
        if (isPlaying) {
            console.log('useEffect is playing');
            if (beat === 1) {
                console.log('useEffect is playing on beat1');
                audioTrack.current.loopStart = 0;
                audioTrack.current.loopEnd = 15.36;
                audioTrack.current.start();
                setArmed(false);
                setTrackPlaying(true);
            }
            else if (beat > 1 && beat < 18) {
                audioTrack.current.loopStart = 7.690;
                audioTrack.current.loopEnd = 15.36;
                if (beat === 17) {
                    audioTrack.current.start();
                    setArmed(false);
                    setTrackPlaying(true);
                    audioTrack.current.loopStart = 0;
                    audioTrack.current.loopEnd = 15.36;
                }
            }
        }
    }, [beat, isPlaying, armed])

    return <div onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} className="m-10 p-4 bg-black">
        <p className="text-green-500 ">Drag and Drop</p>
        <WaveformSVG player={audioTrack.current} stroke={currentStroke}/>
    </div>
}

export default MusicCharacter;