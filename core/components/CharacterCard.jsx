import { useDrag } from 'react-dnd'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import config from '@/app.config.js'

const CharacterCard = ({ character, isDraggable, layout = 'horizontal', show_not_raid_ready_highlighting }) => {
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: 'CHARACTER',
            item: () => ({
                id: character.name,
                name: character.name,
            }),
            canDrag: isDraggable,
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [character.name, isDraggable]
    )

    // Get role information
    const getRoleDisplay = () => {
        if (character.primary_role) {
            return character.primary_role
        }
        // Fallback to spec-based role detection
        return character.spec || 'Unknown'
    }

    // Get guild rank name
    const getRankName = () => {
        return config.GUILLD_RANKS[character.guildRank] || 'Unknown Rank'
    }

    // Check if character is raid ready based on item level
    const is_raid_ready = character.item_level >= config.RAID_TEAM_ILVL

    // Determine if highlighting should be applied
    const should_highlight = show_not_raid_ready_highlighting && !is_raid_ready

    return (
        <div
            ref={drag}
            className={`character-card ${layout} ${isDragging ? 'dragging' : ''} ${character.class} ${should_highlight ? 'not-raid-ready' : ''}`}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: isDraggable ? 'grab' : 'default',
                backgroundColor: should_highlight ? 'rgba(255, 193, 7, 0.15)' : undefined,
                borderLeft: should_highlight ? '3px solid rgba(255, 193, 7, 0.8)' : undefined,
            }}
        >
            {character?.media?.assets?.length ? (
                <img
                    className="character-avatar"
                    src={character.media.assets[0]?.value || character.media.assets[1]?.value}
                    alt={character.name}
                />
            ) : (
                <img
                    className="character-avatar"
                    src="/images/logo-without-text.png"
                    alt={character.name}
                    style={{ opacity: 0.4 }}
                />
            )}
            <div className="character-info">
                <div className={`character-name ${character.class} `}>
                    {character.name}
                </div>
                <div className="character-spec">
                    {character.class}
                </div>
            </div>
        </div>
    )
}

export default CharacterCard
