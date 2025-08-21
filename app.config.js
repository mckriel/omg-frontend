const data = {
    "GUILD_NAME": process.env.NEXT_PUBLIC_GUILD_NAME || "One More Game",
    "GUILD_REALM": process.env.NEXT_PUBLIC_GUILD_REALM || "Sylvanas",
    "REGION": "eu",
    "API_PARAM_REQUIREMENTGS": "namespace=profile-eu&locale=en_US",

    "LEVEL_REQUIREMENT": 80,
    "GUILD_RANK_REQUIREMENT": [0,1,2,3,4,5,6, 7,8,9,10],
    "ITEM_LEVEL_REQUIREMENT": 450,
    "MIN_CHECK_CAP": 600,
    "MAX_CHECK_CAP": 800,
    "MIN_TIER_ITEMLEVEL": 640,
    "ENCHANTABLE_PIECES": ["BACK", "WRIST", "LEGS", "FEET", "CHEST", "MAIN_HAND", "FINGER_1", "FINGER_2"],
    "MAIN_RANKS": [0,1,2,3,4,5,6,7],
    "ALT_RANKS": [8,9,10],
    "TANKS": ["Blood", "Vengeance", "Guardian", "Brewmaster", "Protection"],
    "HEALERS": ["Preservation", "Mistweaver", "Holy", "Discipline", "Restoration"],
    "DIFFICULTY": ["Mythic", "Heroic", "Normal"],
    "_DRAFT_DIFFICULTY": ["LFR", "Raid Finder", "Mythic", "Heroic", "Normal"],
    "SEASON_START_DATE": "2025-01-07",
    "INITIAL_FILTERS": {
        "rankFilter": "all",
        "activeTab": "all",
        "specFilter": "all",
        "instanceIndex": 0,
        "defaultItemLevel": 645
    },
    "GUILLD_RANKS": [
        "Guild Master",
        "Council Member",
        "Officer",
        "Officer Alt",
        "Mythic Raider",
        "Alt Raider",
        "Raider Trial",
        "Social Raider",
        "Alt",
        "Social"
    ],
    "RAID_TEAM_ILVL": 695,
    "RESULTS_PAGINATION": {
        "MAX_ITEMS": 20
    }
}
export default data;