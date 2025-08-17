import React from 'react'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const StatCard = ({ title, value, description, icon: Icon }) => (
    <Paper className="stat-card">
        <Box className="stat-card-header">
            <Icon style={{ marginRight: 8, color: 'var(--wow-gold, #8dd52b)' }} />
            <Typography variant="h6" className="stat-card-title">
                {title}
            </Typography>
        </Box>
        <Typography variant="h4" className="stat-card-value">
            {value}
        </Typography>
        <Typography variant="body2" className="stat-card-description">
            {description}
        </Typography>
    </Paper>
)

export default StatCard 