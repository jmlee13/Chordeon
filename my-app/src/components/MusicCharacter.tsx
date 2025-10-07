import * as Tone from "tone";
import { useRef, useState, useEffect } from "react";
import { useBeat } from "./BeatContext";
import WaveformSVG from "./WaveformSVG";
import MicrophoneIcon from "./MicrophoneIcon";
import ProgressBar from "./ProgressBar";
import { useDrop } from "react-dnd";

type MusicCharacterProps = {
    id: string;
    soundFile: string;
    icon: string;
    strokeColor: string;
    strokeColorDark: string;
};

const ItemTypes = {
    CHARACTER: 'character',
}

export function MusicCharacter() {
    const audioTrack = useRef<Tone.Player | null>(null);

    const ref = useRef<HTMLDivElement>(null);

    const { beat, numberOfLoops, startPlaying, stopPlaying, activeTracks, increment, decrement } = useBeat();

    const [trackPlaying, setTrackPlaying] = useState(false);

    const [isActive, setActive] = useState(false);
    const [isMuted, setMuted] = useState(false);
    const [isMutable, setIsMutable] = useState(false);

    const [currentTrack, setCurrentTrack] = useState<string | null>("");
    const [currentStroke, setCurrentStroke] = useState<string>("");
    const [currentHoverStroke, setCurrentHoverStroke] = useState<string>("");

    const loopLength = Tone.Time("8m").toSeconds();
    const startOffset = loopLength * numberOfLoops;

    const [{ isOver, canDrop }, drop] = useDrop<MusicCharacterProps, void, { isOver: boolean; canDrop: boolean }>({
        accept: ItemTypes.CHARACTER,
        drop: (item) => {

            if (!item.soundFile) return;

            if (audioTrack.current && audioTrack.current.state === 'started') {
                return;
            }

            setCurrentTrack(item.soundFile);
            setCurrentStroke(item.strokeColor);
            setCurrentHoverStroke(item.strokeColorDark);
            setTrackPlaying(false);

            console.log(isActive);

            audioTrack.current = new Tone.Player({
                url: item.soundFile,
                loop: true,
                loopStart: "0:0:0",
                loopEnd: "8:0:0",
                volume: -2,
                autostart: false,
                onload: () => {
                    startPlaying();
                    if (beat === 0) {
                        audioTrack.current?.sync().start(startOffset);
                        setIsMutable(true);
                    }
                    else if (beat > 0 && beat < 17) {
                        audioTrack.current?.sync().start(startOffset + loopLength / 2, loopLength / 2);
                        setIsMutable(true);
                        setActive(true);
                        setTimeout(() => setActive(false), (15.1 - beat) * Tone.Time("4n").toSeconds() * 1000);
                    }
                    else {
                        audioTrack.current?.sync().start(startOffset + loopLength);
                        setIsMutable(true);
                        setActive(true);
                        setTimeout(() => setActive(false), (31.1 - beat) * Tone.Time("4n").toSeconds() * 1000);
                    }
                    
                }
            }).toDestination();
            console.log(isActive);
            if (!trackPlaying) {
                increment();
                setTrackPlaying(true);
            }
        },
    });

    useEffect(() => {
        if (activeTracks === 0) {
            stopPlaying();
        }
        if (ref.current) {
            drop(ref.current);
        }
    }, [beat]);

    const handleDelete = () => {
        if (trackPlaying) {
            audioTrack.current?.dispose();
            console.log('stopped');
            setTrackPlaying(false);
            decrement();
            setCurrentStroke('');
            setActive(false);
            setIsMutable(false);
        }
    }

    const handleMute = () => {  
        if (audioTrack.current) {
            audioTrack.current.mute = !audioTrack.current.mute;
        }
        if (audioTrack.current?.mute) {
            setMuted(true);
        } else {
            setMuted(false);
        }
    }

    return (
        <div>
            <ProgressBar isActive={isActive} />
            <div ref={ref} className="w-[200px] h-[200px] flex justify-center items-center rounded-3xl border-8 border-black p-4" style={{ backgroundColor: currentStroke || "#4d4d4d", opacity: isOver && canDrop ? 0.7 : 1, transition: "background-color 0.3s" }}
                onMouseEnter={(e) => {
                    if (currentStroke) {
                        e.currentTarget.style.backgroundColor = currentHoverStroke;
                    }
                    else {
                        e.currentTarget.style.backgroundColor = "#262626";
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
                onClick={handleDelete}>
                <WaveformSVG player={audioTrack.current} stroke={currentStroke} />
            </div>
            <div className="inline-block" onClick={handleMute}>
                <MicrophoneIcon isMuted={isMuted} isActive={isMutable}/>
            </div>
        </div>
    )
}

export default MusicCharacter;