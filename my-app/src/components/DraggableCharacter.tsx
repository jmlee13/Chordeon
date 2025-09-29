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
        console.log(`data set by draggable character: ${soundFile}`);
        e.dataTransfer.setData('label', label);
        e.dataTransfer.setData('strokeColor', strokeColor);
    };

    return (
        <div draggable
            onDragStart={handleDragStart}
            className="flex justify-evenly">
                <p className=" m-10 p-2 bg-orange-500"> {label}</p>
            </div>
    );
};

export default DraggableCharacter