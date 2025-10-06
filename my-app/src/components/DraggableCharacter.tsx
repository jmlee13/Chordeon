import { useRef, useEffect } from "react";
import { useDrag } from "react-dnd";

type DraggableCharacterProps = {
    id: string;
    soundFile: string;
    icon: string;
    strokeColor: string;
    strokeColorDark: string;
}

const ItemTypes = {
    CHARACTER: 'character',
};

export function DraggableCharacter({id, soundFile, icon, strokeColor, strokeColorDark}: DraggableCharacterProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.CHARACTER,
        item: { id, soundFile, icon, strokeColor, strokeColorDark },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    useEffect(() => {
        if (ref.current) {
            drag(ref.current);
        }
    }, [drag]);

    return (
        <div ref={ref} style={{ opacity: isDragging ? 0 : 1, cursor: "grab" }} className="flex justify-evenly">
            <div className="w-18 h-18 flex justify-center items-center rounded-full border-4 border-black p-1">
                <img src={icon} className="rounded-full"></img>
            </div>
        </div>
    );
};

export default DraggableCharacter