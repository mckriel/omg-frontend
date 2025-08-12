import React from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Chip from '@mui/material/Chip'

const RaidProgression = ({ progressionData }) => {
    if (!progressionData) {
        return null
    }

    // Example structure for current season raid (Nerub-ar Palace)
    const currentRaid = progressionData.currentRaid || {
        name: 'Nerub-ar Palace',
        difficulties: {
            'LFR': { completed: 8, total: 8 },
            'Normal': { completed: 8, total: 8 },
            'Heroic': { completed: 8, total: 8 },
            'Mythic': { completed: 3, total: 8 }
        }
    }

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'LFR': return '#4caf50'
            case 'Normal': return '#2196f3'
            case 'Heroic': return '#ff9800'
            case 'Mythic': return '#e91e63'
            default: return '#757575'
        }
    }

    const getProgressPercentage = (completed, total) => {
        return total > 0 ? (completed / total) * 100 : 0
    }

    return (
        <Paper sx={{ p: 3, mb: 3 }}>
            <Typography 
                variant="h4" 
                component="h2" 
                sx={{ 
                    mb: 3, 
                    fontFamily: 'var(--font-blizzard-primary)',
                    fontSize: '2rem'
                }}
            >
                Guild Raid Progression
            </Typography>
            
            <Typography 
                variant="h5" 
                component="h3"
                sx={{ 
                    mb: 2,
                    fontFamily: 'var(--font-blizzard-primary)',
                    fontSize: '1.5rem'
                }}
            >
                {currentRaid.name}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {Object.entries(currentRaid.difficulties).map(([difficulty, progress]) => (
                    <Box key={difficulty} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Chip 
                            label={difficulty}
                            sx={{ 
                                minWidth: 80,
                                backgroundColor: getDifficultyColor(difficulty),
                                color: 'white',
                                fontFamily: 'var(--font-blizzard-primary)',
                                fontWeight: 600
                            }}
                        />
                        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LinearProgress
                                variant="determinate"
                                value={getProgressPercentage(progress.completed, progress.total)}
                                sx={{
                                    flexGrow: 1,
                                    height: 10,
                                    borderRadius: 5,
                                    backgroundColor: '#2a2a2a',
                                    '& .MuiLinearProgress-bar': {
                                        backgroundColor: getDifficultyColor(difficulty),
                                        borderRadius: 5,
                                    },
                                }}
                            />
                            <Typography
                                variant="body1"
                                sx={{ 
                                    minWidth: 50,
                                    fontFamily: 'var(--font-blizzard-primary)',
                                    fontWeight: 500
                                }}
                            >
                                {progress.completed}/{progress.total}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>

            {/* Optional: Show latest boss kills */}
            {progressionData.recentKills && progressionData.recentKills.length > 0 && (
                <Box sx={{ mt: 3 }}>
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            mb: 2,
                            fontFamily: 'var(--font-blizzard-primary)'
                        }}
                    >
                        Recent Boss Kills
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {progressionData.recentKills.slice(0, 5).map((kill, index) => (
                            <Chip
                                key={index}
                                label={`${kill.bossName} (${kill.difficulty})`}
                                size="small"
                                sx={{ 
                                    backgroundColor: getDifficultyColor(kill.difficulty),
                                    color: 'white',
                                    fontFamily: 'var(--font-blizzard-primary)'
                                }}
                            />
                        ))}
                    </Box>
                </Box>
            )}
        </Paper>
    )
}

export default RaidProgression