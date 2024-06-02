import { RARITY } from '../rarity.js';
import { TRIBE } from '../tribe.js'
import { AbstractCard } from '../abstractcard.js';

export class AbstractMinion extends AbstractCard {
    constructor(mana, attack, health) {
        super();
        this.setDefaultValues();
        this.attack = attack;
        this.health = health;
        this.mana = mana;
        this.baseAttack = attack;
        this.baseHealth = health;
        this.baseMana = mana;
    }

    setDefaultValues() {
        this.isMinion = true;

        this.minionID = MINION_IDS.WISP;
        this.tribe = TRIBE.NONE;

        this.deathSound = '';
        this.attackSound = '';

        this.canAttack = false;
        this.hasCharge = false;
        this.hasTaunt = false;
        this.hasDivineShield = false;
        this.hasStealth = false;
        this.hasWindfury = false;
        this.hasElusive = false;
        this.hasPoison = false;
    }

    battlecry() { /* stub */ }
    deathrattle() { /* stub */ }
    enrage() { /* stub */ }
    chooseOne() { /* stub */ }
    combo() { /* stub */ }
    startTurnEffect() { /* stub */ }
    endTurnEffect() { /* stub */ }
    auraEffect() { /* stub */ }
    inHandEffect() { /* stub */ }

    triggerSummon() {
        // maybe not necessary
        // basically just put the card on the board but don't do anything with it
    }

    triggerPlay() {
        (new Audio(this.musicSound)).play();
        (new Audio(this.playSound)).play();
        // play this minion
        // overload?
        // combo?
        // choose one?
        // trigger battlecry?
    }

    triggerDeath() {
        (new Audio(this.deathSound)).play();
        // destroy this minion
        // trigger deathrattle?
    }

    triggerAttack() {
        (new Audio(this.attackSound)).play();
        // attack with this minion
        // take damage
        // trigger enrage?
    }

    applyDamage(dmg) {
        this.health -= dmg;
        if (this.health < 1) {
            // trigger death
        }
        return this.health < 1;
    }
}

/*
if (nameOfCard == "Ragnaros the Firelord") {
    cardDiv.classList.add('ragnarosTheFirelord')
    setTimeout(function () {
        document.getElementById("game").classList.add("legendaryFlipAnim");
        setTimeout(function () {
            document.getElementById("game").classList.remove("legendaryFlipAnim");
        }, 1 * 1000);
    }, 1.9 * 1000);
} else if (nameOfCard == "The Lich King") {
    cardDiv.style.visibility = "hidden";
    setTimeout(function () {
        cardDiv.classList.add('theLichKing')
        cardDiv.style.visibility = "visible";
        setTimeout(function () {
            document.getElementById("game").classList.add("theLichKingShake");
            setTimeout(function () {
                document.getElementById("game").classList.remove("theLichKingShake");
            }, 1 * 1000);
        }, 0.25 * 1000)
    }, 2 * 1000)
} else if (nameOfCard == "Stormwind Champion") {
    setTimeout(function () {
        cardDiv.classList.add("stormwindChampion");
    }, 0.75 * 1000);
    setTimeout(function () {
        document.getElementById("game").classList.add("epicFlipAnim");
        setTimeout(function () {
            document.getElementById("game").classList.remove("epicFlipAnim");
        }, 1 * 1000);
    }, 2 * 1000);
} else if (nameOfCard == "Deathwing") {
    cardDiv.classList.add("deathwing");
    setTimeout(function () {
        document.getElementById("game").classList.add("deathwingShake");
        setTimeout(function () {
            document.getElementById("game").classList.remove("deathwingShake");
        }, 1 * 1000);
    }, 1.25 * 1000);
} else {
    cardDiv.classList.add('placeCardAnim');
}
*/

export const MINION_IDS = {
    KEEPER_OF_THE_GROVE: 1,
    DRUID_OF_THE_CLAW: 2,
    ANCIENT_OF_LORE: 3,
    ANCIENT_OF_WAR: 4,
    IRONBARK_PROTECTOR: 5,
    CENARIUS: 6,

    TIMBER_WOLF: 7,
    SCAVENGING_HYENA: 8,
    STARVING_BUZZARD: 9,
    HOUNDMASTER: 10,
    TUNDRA_RHINO: 11,
    SAVANNAH_HIGHMANE: 12,
    KING_KRUSH: 13,

    MANA_WYRM: 14,
    SORCERERS_APPRENTICE: 15,
    KIRIN_TOR_MAGE: 16,
    ETHEREAL_ARCANIST: 17,
    WATER_ELEMENTAL: 18,
    ARCHMAGE_ANTONIDAS: 19,

    ARGENT_PROTECTOR: 20,
    ALDOR_PEACEKEEPER: 21,
    GUARDIAN_OF_KINGS: 22,
    TIRION_FORDRING: 23,

    NORTHSHIRE_CLERIC: 24,
    LIGHTWELL: 25,
    AUCHENAI_SOULPRIEST: 26,
    LIGHTSPAWN: 27,
    CABAL_SHADOW_PRIEST: 28,
    TEMPLE_ENFORCER: 29,
    PROPHET_VELEN: 30,

    DEFIAS_RINGLEADER: 31,
    PATIENT_ASSASSIN: 32,
    EDWIN_VANCLEEF: 33,
    SI7_AGENT: 34,
    MASTER_OF_DISGUISE: 35,
    KIDNAPPER: 36,

    DUST_DEVIL: 37,
    FLAMETONGUE_TOTEM: 38,
    MANA_TIDE_TOTEM: 39,
    UNBOUND_ELEMENTAL: 40,
    WINDSPEAKER: 41,
    EARTH_ELEMENTAL: 42,
    FIRE_ELEMENTAL: 43,
    ALAKIR_THE_WINDLORD: 44,

    BLOOD_IMP: 45,
    FLAME_IMP: 46,
    VOIDWALKER: 47,
    FELSTALKER: 48,
    FELGUARD: 49,
    VOID_TERROR: 50,
    PIT_LORD: 51,
    SUMMONING_PORTAL: 52,
    DOOMGUARD: 53,
    DREAD_INFERNAL: 54,
    LORD_JARAXXUS: 55,

    ARMORSMITH: 56,
    CRUEL_TASKMASTER: 57,
    FROTHING_BERSERKER: 58,
    WARSONG_COMMANDER: 59,
    ARATHI_WEAPONSMITH: 60,
    KORKRON_ELITE: 61,
    GROMMASH_HELLSCREAM: 62,

    /*
    WISP: ,
    ABUSIVE_SERGEANT: ,
    ANGRY_CHICKEN: ,
    ARGENT_SQUIRE: ,
    BLOODSAIL_CORSAIR: ,
    ELVEN_ARCHER: ,
    GOLDSHIRE_FOOTMAN: ,
    GRIMSCALE_ORACLE: ,
    HUNGRY_CRAB: ,
    LEPER_GNOME: ,
    LIGHTWARDEN: ,
    MURLOC_RAIDER: ,
    MURLOC_TIDECALLER: ,
    SECRETKEEPER: ,
    SHIELDBEARER: ,
    SOUTHSEA_DECKHAND: ,
    STONETUSK_BOAR: ,
    VOODOO_DOCTOR: ,
    WORGEN_INFILTRATOR: ,
    YOUNG_DRAGONHAWK: ,
    YOUNG_PRIESTESS: ,
    ACIDI_SWAMP_OOZE: ,
    AMANI_BERSERKER: ,
    ANCIENT_WATCHER: ,
    BLOODFEN_RAPTOR: ,
    BLOODMAGE_THALNOS: ,
    BLOODSAIL_RAIDER: ,
    BLUEGILL_WARRIOR: ,
    CAPTAINS_PARROT: ,
    CRAZED_ALCHEMIST: ,
    DIRE_WOLF_ALPHA: ,
    DOOMSAYER: ,
    FAERIE_DRAGON: ,
    FROSTWOLF_GRUNT: ,
    IRONBEAK_OWL: ,
    KNIFE_JUGGLER: ,
    KOBOLD_GEOMANCER: ,
    LOOT_HOARDER: ,
    LOREWALKER_CHO: ,
    MAD_BOMBER: ,
    MANA_ADDICT: ,
    MANA_WRAITH: ,
    MASTER_SWORDSMITH: ,
    MILLHOUSE_MANASTORM: ,
    MURLOC_TIDEHUNTER: ,
    NAT_PAGLE: ,
    NOVICE_ENGINEER: ,
    PINT_SIZED_SUMMONER: ,
    RIVER_CROCOLISK: ,
    SUNFURY_PROTECTOR: ,
    WILD_PYROMANCER: ,
    YOUTHFUL_BREWMASTER: ,
    ACOLYTE_OF_PAIN: ,
    ALARM_O_BOT: ,
    ARCANE_GOLEM: ,
    BIG_GAME_HUNTER: ,
    BLOOD_KNIGHT: ,
    COLDLIGHT_ORACLE: ,
    COLDLIGHT_SEER: ,
    DALARAN_MAGE: ,
    DEMOLISHER: ,
    EARTHEN_RING_FARSEER: ,
    EMPEROR_COBRA: ,
    FLESHEATING_GHOUL: ,
    HARVEST_GOLEM: ,
    IMP_MASTER: ,
    INJURED_BLADEMASTER: ,
    IRONFORGE_RIFLEMAN: ,
    IRONFUR_GRIZZLY: ,
    JUNGLE_PANTHER: ,
    KING_MUKLA: ,
    MAGMA_RAGER: ,
    MIND_CONTROL_TECH: ,
    MURLOC_WARLEADER: ,
    QUESTING_ADVENTURER: ,
    RAGING_WORGEN: ,
    RAID_LEADER: ,
    RAZORFEN_HUNTER: ,
    SCARLET_CRUSADER: ,
    SHATTERED_SUN_CLERIC: ,
    SILVERBACK_PATRIARCH: ,
    SOUTHSEA_CAPTAIN: ,
    TAUREN_WARRIOR: ,
    THRALLMAR_FARSEER: ,
    TINKMASTER_OVERSPARK: ,
    WOLFRIDER: ,
    ANCIENT_BREWMASTER: ,
    ANCIENT_MAGE: ,
    CHILLWIND_YETI: ,
    CULT_MASTER: ,
    DARK_IRON_DWARF: ,
    DEFENDER_OF_ARGUS: ,
    DRAGONLING_MECHANIC: ,
    DREAD_CORSAIR: ,
    GNOMISH_INVENTOR: ,
    LEEROY_JENKINS: ,
    MOGUSHAN_WARDEN: ,
    OASIS_SNAPJAW: ,
    OGRE_MAGI: ,
    OLD_MURK_EYE: ,
    SENJIN_SHIELDMASTA: ,
    SILVERMOON_GUARDIAN: ,
    SPELLBREAKER: ,
    STORMWIND_KNIGHT: ,
    TWILIGHT_DRAKE: ,
    VIOLET_TEACHER: ,
    ABOMINATION: ,
    AZURE_DRAKE: ,
    BOOTY_BAY_BODYGUARD: ,
    CAPTAIN_GREENSKIN: ,
    DARKSCALE_HEALER: ,
    ELITE_TAUREN_CHIEFTAIN: ,
    FACELESS_MANIPULATOR: ,
    FEN_CREEPER: ,
    FROSTWOLF_WARLORD: ,
    GADGETZAN_AUCTIONEER: ,
    GURUBASHI_BERSERKER: ,
    HARRISON_JONES: ,
    NIGHTBLADE: ,
    SILVER_HAND_KNIGHT: ,
    SPITEFUL_SMITH: ,
    STAMPEDING_KODO: ,
    STORMPIKE_COMMANDO: ,
    STRANGLETHORN_TIGER: ,
    VENTURE_CO_MERCENARY: ,
    ARCHMAGE: ,
    ARGENT_COMMANDER: ,
    BOULDERFIST_OGRE: ,
    CAIRNE_BLOODHOOF: ,
    FROST_ELEMENTAL: ,
    GELBIN_MEKKATORQUE: ,
    HOGGER: ,
    ILLIDAN_STORMRAGE: ,
    LORD_OF_THE_ARENA: ,
    PRIESTESS_OF_ELUNE: ,
    RECKLESS_ROCKETEER: ,
    SUNWALKER: ,
    SYLVANAS_WINDRUNNER: ,
    THE_BEAST: ,
    THE_BLACK_KNIGHT: ,
    WINDFURY_HARPY: ,
    BARON_GEDDON: ,
    CORE_HOUND: ,
    RAVENHOLDT_ASSASSIN: ,
    STORMWIND_CHAMPION: ,
    WAR_GOLEM: ,
    GRUUL: ,
    RAGNAROS_THE_FIRELORD: ,
    ALEXSTRASZA: ,
    MALYGOS: ,
    NOZDORMU: ,
    ONYXIA: ,
    YSERA: ,
    DEATHWING: ,
    SEA_GIANT: ,
    MOUNTAIN_GIANT: ,
    MOLTEN_GIANT: 
    */
};