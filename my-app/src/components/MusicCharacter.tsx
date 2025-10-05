import * as Tone from "tone";
import { useRef, useState, useEffect } from "react";
import { useBeat } from "./BeatContext";
import WaveformSVG from "./WaveformSVG";
import MicrophoneIcon from "./MicrophoneIcon";

export function MusicCharacter() {
    const audioTrack = useRef<Tone.Player | null>(null);

    const { beat, numberOfLoops, isPlaying, startPlaying, stopPlaying, activeTracks, increment, decrement } = useBeat();

    const [armed, setArmed] = useState(false);
    const [trackPlaying, setTrackPlaying] = useState(false);

    const [currentTrack, setCurrentTrack] = useState<string | null>("");
    const [currentStroke, setCurrentStroke] = useState<string>("");
    const [currentHoverStroke, setCurrentHoverStroke] = useState<string>("");


    const handleDrop = (e: React.DragEvent) => {
        
        e.preventDefault();
        const droppedFile = e.dataTransfer.getData('soundFile');
        const droppedStroke = e.dataTransfer.getData('strokeColor');
        const hoverStroke = e.dataTransfer.getData('strokeColorDark');

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
        setCurrentHoverStroke(hoverStroke);
        setArmed(false);
        setTrackPlaying(false);
        

        audioTrack.current = new Tone.Player({
            url: droppedFile,
            loop: true,
            loopStart: "0:0:0",
            loopEnd: "8:0:0",
            volume: -2,
            autostart: false,
            onload: () => {
                startPlaying();
                console.log(`numberOfLoops: ${numberOfLoops}`)
                if (beat === 0){
                    audioTrack.current?.sync().start(0);
                    console.log('started at beginning')
                    console.log(beat)
                }
                else if (beat > 1 && beat < 17) {
                    audioTrack.current?.sync().start("4:0:0", 15.36 / 2);
                    console.log('queued for halfway')
                    console.log(beat)
                }
                else {
                    audioTrack.current?.sync().start("8:0:0");
                    console.log('queued for next loop cycle')
                }
            }
        }).toDestination();
        if (!trackPlaying){
            increment();
            setTrackPlaying(true);
        }
    };

    const handleDelete = () => {
        if (trackPlaying){
            audioTrack.current?.dispose();
            console.log('stopped');
            setTrackPlaying(false);
            decrement();
            setCurrentStroke('');
        }
        
        if (activeTracks < 1) stopPlaying();
        console.log(activeTracks);
    }

    const handleMute = () => {
        if (audioTrack.current) {
            audioTrack.current.mute = !audioTrack.current.mute;
        }
    }

    return (
        <div>
            <div className="w-[200px] h-[200px] flex justify-center items-center rounded-3xl border-8 border-black p-4" style={{ backgroundColor: currentStroke || "#4d4d4d" }}
                onMouseEnter={(e) => {
                    if (currentStroke) {
                        e.currentTarget.style.backgroundColor = currentHoverStroke;
                    }
                    else {
                        e.currentTarget.style.backgroundColor = "#3a3a3a";
                    }
                }}

                onMouseLeave={(e) => {
                    if (currentStroke) {
                        e.currentTarget.style.backgroundColor = currentStroke;
                    }
                    else {
                        e.currentTarget.style.backgroundColor = "#4d4d4d";
                    }
                }}
                onClick={handleDelete} onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
                <WaveformSVG player={audioTrack.current} stroke={currentStroke} />
            </div>
            <div className="flex justify-center" onClick={handleMute}>
                <MicrophoneIcon />
            </div>
        </div>
    )
}

export default MusicCharacter;