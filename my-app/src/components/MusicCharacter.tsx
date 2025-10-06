import * as Tone from "tone";
import { useRef, useState, useEffect } from "react";
import { useBeat } from "./BeatContext";
import WaveformSVG from "./WaveformSVG";
import MicrophoneIcon from "./MicrophoneIcon";
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

    const { beat, numberOfLoops, isPlaying, startPlaying, stopPlaying, activeTracks, increment, decrement } = useBeat();

    const [trackPlaying, setTrackPlaying] = useState(false);

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
                    console.log('started at beginning')
                    console.log(startOffset)
                }
                else if (beat > 0 && beat < 17) {
                    audioTrack.current?.sync().start(startOffset + loopLength / 2, loopLength / 2);
                    console.log('queued for halfway')
                }
                else {
                    audioTrack.current?.sync().start(startOffset + loopLength);
                    console.log('queued for next loop cycle')
                }
            }
        }).toDestination();
        if (!trackPlaying) {
            increment();
            setTrackPlaying(true);
        }
    }
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
        }
    }

    const handleMute = () => {
        if (audioTrack.current) {
            audioTrack.current.mute = !audioTrack.current.mute;
        }
    }

    return (
        <div>
            <div ref={ref} className="w-[200px] h-[200px] flex justify-center items-center rounded-3xl border-8 border-black p-4" style={{ backgroundColor: currentStroke || "#4d4d4d", opacity: isOver && canDrop ? 0.7 : 1, transition: "background-color 0.3s" }}
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
                onClick={handleDelete}>
                <WaveformSVG player={audioTrack.current} stroke={currentStroke} />
            </div>
            <div className="inline-block" onClick={handleMute}>
                <MicrophoneIcon/>
            </div>
        </div>
    )
}

export default MusicCharacter;