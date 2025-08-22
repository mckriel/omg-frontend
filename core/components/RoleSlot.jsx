import { useDrop } from 'react-dnd'
import { useCallback } from 'react'
import Paper from '@mui/material/Paper'
import CharacterCard from './CharacterCard'

const RoleSlot = ({ roleType, index, character, onDrop, show_not_raid_ready_highlighting }) => {
    const handleDrop = useCallback(
        (item) => {
            onDrop(item.id, roleType, index)
        },
        [onDrop, roleType, index]
    )

    const [{ isOver, canDrop }, drop] = useDrop(
        () => ({
            accept: 'CHARACTER',
            drop: handleDrop,
            collect: (monitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }),
        }),
        [handleDrop]
    )

    return (
        <div
            ref={drop}
            className={`role-slot ${canDrop ? 'can-drop' : ''} ${isOver ? 'is-over' : ''}`}
        >
            {character && (
                <CharacterCard 
                    character={character} 
                    isDraggable={true} 
                    show_not_raid_ready_highlighting={show_not_raid_ready_highlighting}
                />
            )}
        </div>
    )
}

export default RoleSlot
