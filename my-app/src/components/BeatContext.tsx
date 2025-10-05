import React, { createContext, useContext, useState} from "react";

type BeatContextType = {
    beat: number;
    numberOfLoops: number;
    setBeat: React.Dispatch<React.SetStateAction<number>>;
    setNumberOfLoops: React.Dispatch<React.SetStateAction<number>>;
    isPlaying: boolean;
    startPlaying: () => void;
    stopPlaying: () => void;
    activeTracks: number;
    increment: () => void;
    decrement: () => void;
}

const BeatContext = createContext<BeatContextType | null>(null);

export function useBeat(){
    const ctx = useContext(BeatContext);
    if (!ctx) throw new Error("useBeat must be used within a BeatProvider");
    return ctx;
}

export function BeatProvider({ children }: { children: React.ReactNode }) {
    const [beat, setBeat] = useState(0);
    const [numberOfLoops, setNumberOfLoops] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const [activeTracks, setActiveTracks] = useState(0);

    const increment = () => setActiveTracks((c) => c + 1);
    const decrement = () => setActiveTracks((c) => (c > 0 ? c - 1 : 0));

    const startPlaying = () => setIsPlaying(true);
    const stopPlaying = () => setIsPlaying(false);
    return (
        <BeatContext.Provider value={{ beat, setBeat, numberOfLoops, setNumberOfLoops, isPlaying, startPlaying, stopPlaying, activeTracks, increment, decrement}}>
            {children}
        </BeatContext.Provider>
    )
}

export default BeatContext;