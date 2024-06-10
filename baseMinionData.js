const RARITY = {
    COMMON: "Common",
    FREE: "Free",
    RARE: "Rare",
    EPIC: "Epic",
    LEGENDARY: "Legendary"
};

const TRIBE = {
    NONE: "",
    BEAST: "Beast",
    TOTEM: "Totem",
    DEMON: "Demon",
    MURLOC: "Murloc",
    PIRATE: "Pirate",
    MECH: "Mech",
    UNDEAD: "Undead",
    DRAGON: "Dragon"
};

export const ATTRIBUTES = {
    CHARGE: 0,
    TAUNT: 1,
    DIVINE_SHIELD: 2,
    STEALTH: 3,
    WINDFURY: 4,
    ELUSIVE: 5,
    POISON: 6
}

// minions objects will have more data than this
// these are just the baseline stats for each minion, before manipulation
export const MinionData = [
    { // DRUID
        "name": "Keeper of the Grove",
        "description": "",
        "stats": [4, 2, 4],
        "rarity": RARITY.RARE,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Druid of the Claw",
        "description": "",
        "stats": [5, 4, 4],
        "rarity": RARITY.COMMON,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Ancient of Lore",
        "description": "",
        "stats": [7, 5, 5],
        "rarity": RARITY.EPIC,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Ancient of War",
        "description": "",
        "stats": [7, 5, 5],
        "rarity": RARITY.RARE,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Ironbark Protector",
        "description": "",
        "stats": [8, 8, 8],
        "rarity": RARITY.FREE,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [false, true, false, false, false, false, false]
    }, {
        "name": "Cenarius",
        "description": "",
        "stats": [9, 5, 8],
        "rarity": RARITY.LEGENDARY,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, { // HUNTER
        "name": "Timber Wolf",
        "description": "",
        "stats": [1, 1, 1],
        "rarity": RARITY.FREE,
        "tribe": TRIBE.BEAST,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Scavenging Hyena",
        "description": "",
        "stats": [2, 2, 2],
        "rarity": RARITY.COMMON,
        "tribe": TRIBE.BEAST,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Starving Buzzard",
        "description": "",
        "stats": [2, 2, 1],
        "rarity": RARITY.FREE,
        "tribe": TRIBE.BEAST,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Houndmaster",
        "description": "",
        "stats": [4, 4, 3],
        "rarity": RARITY.RARE,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Tundra Rhino",
        "description": "",
        "stats": [5, 2, 5],
        "rarity": RARITY.FREE,
        "tribe": TRIBE.BEAST,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Savannah Highmane",
        "description": "",
        "stats": [6, 6, 5],
        "rarity": RARITY.RARE,
        "tribe": TRIBE.BEAST,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "King Krush",
        "description": "",
        "stats": [9, 8, 8],
        "rarity": RARITY.LEGENDARY,
        "tribe": TRIBE.BEAST,
        "overload": 0,
        "attributes": [true, false, false, false, false, false, false]
    }, { // MAGE
        "name": "Mana Wyrm",
        "description": "",
        "stats": [1, 1, 3],
        "rarity": RARITY.COMMON,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Sorcerer's Apprentice",
        "description": "",
        "stats": [2, 3, 2],
        "rarity": RARITY.COMMON,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Kirin Tor Mage",
        "description": "",
        "stats": [3, 4, 3],
        "rarity": RARITY.RARE,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Ethereal Arcanist",
        "description": "",
        "stats": [4, 3, 3],
        "rarity": RARITY.RARE,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Water Elemental",
        "description": "",
        "stats": [4, 3, 6],
        "rarity": RARITY.FREE,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Archmage Antonidas",
        "description": "",
        "stats": [7, 5, 7],
        "rarity": RARITY.LEGENDARY,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, { // PALADIN
        "name": "Argent Protector",
        "description": "",
        "stats": [2, 2, 2],
        "rarity": RARITY.COMMON,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Aldor Peacekeeper",
        "description": "",
        "stats": [3, 3, 3],
        "rarity": RARITY.RARE,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Guardian of Kings",
        "description": "",
        "stats": [7, 5, 6],
        "rarity": RARITY.FREE,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Tirion Fordring",
        "description": "",
        "stats": [8, 6, 6],
        "rarity": RARITY.LEGENDARY,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [false, true, false, false, false, false, false]
    }, { // PRIEST
        "name": "Northshire Cleric",
        "description": "",
        "stats": [1, 1, 3],
        "rarity": RARITY.COMMON,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Lightwell",
        "description": "",
        "stats": [2, 0, 5],
        "rarity": RARITY.RARE,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Auchenai Soulpriest",
        "description": "",
        "stats": [4, 3, 5],
        "rarity": RARITY.RARE,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Lightspawn",
        "description": "",
        "stats": [4, 0, 5],
        "rarity": RARITY.COMMON,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Cabal Shadow Priest",
        "description": "",
        "stats": [6, 4, 5],
        "rarity": RARITY.EPIC,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Temple Enforcer",
        "description": "",
        "stats": [6, 6, 6],
        "rarity": RARITY.COMMON,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Prophet Velen",
        "description": "",
        "stats": [7, 7, 7],
        "rarity": RARITY.LEGENDARY,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, { // ROGUE
        "name": "Defias Ring Leader",
        "description": "",
        "stats": [2, 2, 2],
        "rarity": RARITY.COMMON,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Patient Assassin",
        "description": "",
        "stats": [2, 1, 1],
        "rarity": RARITY.RARE,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [false, false, false, true, false, false, true]
    }, {
        "name": "Edwin VanCleef",
        "description": "",
        "stats": [3, 2, 2],
        "rarity": RARITY.LEGENDARY,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "SI:7 Agent",
        "description": "",
        "stats": [3, 3, 3],
        "rarity": RARITY.RARE,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Master of Disguise",
        "description": "",
        "stats": [4, 4, 4],
        "rarity": RARITY.RARE,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Kidnapper",
        "description": "",
        "stats": [6, 5, 3],
        "rarity": RARITY.RARE,
        "tribe": TRIBE.UNDEAD,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, { // SHAMAN
        "name": "Dust Devil",
        "description": "",
        "stats": [1, 3, 1],
        "rarity": RARITY.COMMON,
        "tribe": TRIBE.NONE,
        "overload": 2,
        "attributes": [false, false, false, false, true, false, false]
    }, {
        "name": "Flametongue Totem",
        "description": "",
        "stats": [2, 0, 3],
        "rarity": RARITY.FREE,
        "tribe": TRIBE.TOTEM,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Mana Tide Totem",
        "description": "",
        "stats": [3, 0, 3],
        "rarity": RARITY.RARE,
        "tribe": TRIBE.TOTEM,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Unbound Elemental",
        "description": "",
        "stats": [3, 2, 4],
        "rarity": RARITY.COMMON,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Windspeaker",
        "description": "",
        "stats": [4, 3, 3],
        "rarity": RARITY.FREE,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Earth Elemental",
        "description": "",
        "stats": [5, 7, 8],
        "rarity": RARITY.EPIC,
        "tribe": TRIBE.NONE,
        "overload": 3,
        "attributes": [false, true, false, false, false, false, false]
    }, {
        "name": "Fire Elemental",
        "description": "",
        "stats": [6, 6, 5],
        "rarity": RARITY.FREE,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Al'Akir the Windlord",
        "description": "",
        "stats": [8, 3, 5],
        "rarity": RARITY.LEGENDARY,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [true, true, true, false, true, false, false]
    }, { // WARLOCK
        "name": "Blood Imp",
        "description": "",
        "stats": [1, 0, 1],
        "rarity": RARITY.COMMON,
        "tribe": TRIBE.DEMON,
        "overload": 0,
        "attributes": [false, false, false, true, false, false, false]
    }, {
        "name": "Flame Imp",
        "description": "",
        "stats": [1, 3, 2],
        "rarity": RARITY.COMMON,
        "tribe": TRIBE.DEMON,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Voidwalker",
        "description": "",
        "stats": [1, 1, 3],
        "rarity": RARITY.FREE,
        "tribe": TRIBE.DEMON,
        "overload": 0,
        "attributes": [false, true, false, false, false, false, false]
    }, {
        "name": "Felstalker",
        "description": "",
        "stats": [2, 4, 3],
        "rarity": RARITY.FREE,
        "tribe": TRIBE.DEMON,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Felguard",
        "description": "",
        "stats": [3, 3, 5],
        "rarity": RARITY.RARE,
        "tribe": TRIBE.DEMON,
        "overload": 0,
        "attributes": [false, true, false, false, false, false, false]
    }, {
        "name": "Void Terror",
        "description": "",
        "stats": [3, 3, 3],
        "rarity": RARITY.RARE,
        "tribe": TRIBE.DEMON,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Pit Lord",
        "description": "",
        "stats": [4, 5, 6],
        "rarity": RARITY.RARE,
        "tribe": TRIBE.DEMON,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Summoning Portal",
        "description": "",
        "stats": [4, 0, 4],
        "rarity": RARITY.COMMON,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Doomguard",
        "description": "",
        "stats": [5, 5, 7],
        "rarity": RARITY.RARE,
        "tribe": TRIBE.DEMON,
        "overload": 0,
        "attributes": [true, false, false, false, false, false, false]
    }, {
        "name": "Dread Infernal",
        "description": "",
        "stats": [6, 6, 6],
        "rarity": RARITY.FREE,
        "tribe": TRIBE.DEMON,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Lord Jaraxxus",
        "description": "",
        "stats": [9, 3, 15],
        "rarity": RARITY.LEGENDARY,
        "tribe": TRIBE.DEMON,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, { // WARRIOR
        "name": "Armorsmith",
        "description": "",
        "stats": [2, 1, 4],
        "rarity": RARITY.RARE,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Cruel Taskmaster",
        "description": "",
        "stats": [2, 2, 2],
        "rarity": RARITY.COMMON,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Frothing Berserker",
        "description": "",
        "stats": [3, 2, 4],
        "rarity": RARITY.RARE,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Warsong Commander",
        "description": "",
        "stats": [3, 2, 3],
        "rarity": RARITY.FREE,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Arathi Weaponsmith",
        "description": "",
        "stats": [4, 3, 3],
        "rarity": RARITY.COMMON,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [false, false, false, false, false, false, false]
    }, {
        "name": "Kor'kron Elite",
        "description": "",
        "stats": [4, 4, 3],
        "rarity": RARITY.FREE,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [true, false, false, false, false, false, false]
    }, {
        "name": "Grommash Hellscream",
        "description": "",
        "stats": [8, 4, 9],
        "rarity": RARITY.LEGENDARY,
        "tribe": TRIBE.NONE,
        "overload": 0,
        "attributes": [true, false, false, false, false, false, false]
    }
]