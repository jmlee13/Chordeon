import React from "react";

type DraggableCharacterProps = {
    id: string;
    soundFile: string;
    label: string;
    strokeColor: string;
}

export function DraggableCharacter({id, soundFile, label, strokeColor }: DraggableCharacterProps) {
    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData('soundFile', soundFile);
        console.log(soundFile);
        e.dataTransfer.setData('label', label);
        e.dataTransfer.setData('strokeColor', strokeColor);
    };

    return (
        <div draggable
            onDragStart={handleDragStart}
            className="flex justify-evenly">
            <p className="w-24 h-24 p-2 m-2 bg-white rounded-full border-black border-8"> {label}</p>
        </div>
    );
};

export default DraggableCharacter