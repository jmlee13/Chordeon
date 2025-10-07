import { useBeat} from "./BeatContext";
import { useEffect } from "react";

export function LoopTracker() {
    const { beat, numberOfLoops, setNumberOfLoops, isPlaying} = useBeat();

        useEffect(() => {
        if (beat === 0 && isPlaying) {
            setNumberOfLoops((prev) => (prev + 1));
            console.log('number of loops:', numberOfLoops);
        }
        else if (!isPlaying) {
            setNumberOfLoops(0);
        }
    }, [beat]);

    return (
        <p></p>
    )
}

export default LoopTracker;