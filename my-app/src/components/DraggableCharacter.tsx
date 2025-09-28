import React from "react";

type DraggableCharacterProps = {
    id: string;
    soundFile: string;
    label: string;
}

export function DraggableCharacter({id, soundFile, label}: DraggableCharacterProps) {
    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData('soundFile', soundFile);
        e.dataTransfer.setData('label', label);
    };

    return (
        <div draggable
            onDragStart={handleDragStart}
            className="flex justify-center">
                <p className=" m-10 p-2 bg-orange-500"> {label}</p>
            </div>
    );
};

export default DraggableCharacter