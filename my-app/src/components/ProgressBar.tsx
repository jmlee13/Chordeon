import { useState, useEffect } from "react";
import { useBeat } from "./BeatContext";

type ProgressBarProps = {
    isActive: boolean;
}

export default function ProgressBar({ isActive = false }: ProgressBarProps) {
    const [progress, setProgress] = useState(0);
    const { beat } = useBeat();

    useEffect(() => {
        const timer = setInterval(() => {
            if (isActive = true) {
                setProgress((prevProgress) => (prevProgress >= 100 ? 0 : (beat * 6.25) % 100));
            }
        }, 50);
        return () => clearInterval(timer);
    }, [beat]);

    return (
        <div className="flex justify-center p-4" style={{ opacity: isActive ? 1 : 0, transition: "opacity 0.3s" }}>
            <div className="w-full bg-gray-300 rounded-full h-2 dark:bg-gray-300">
                <div className="bg-blue-700 h-2 rounded-full transition-all duration-50 ease-in-out" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    )
}