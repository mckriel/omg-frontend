import React from 'react'
import StatCard from './StatCard'
import ShieldIcon from '@mui/icons-material/Shield'
import HealingIcon from '@mui/icons-material/Healing'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'

const RoleDistribution = ({ tanks, healers, dps }) => (
    <div className="dashboard-grid">
        <StatCard
            title="Tanks"
            value={tanks}
            description="Active tank players"
            icon={ShieldIcon}
        />
        <StatCard
            title="Healers"
            value={healers}
            description="Active healer players"
            icon={HealingIcon}
        />
        <StatCard
            title="DPS"
            value={dps}
            description="Active DPS players"
            icon={LocalFireDepartmentIcon}
        />
    </div>
)

export default RoleDistribution 