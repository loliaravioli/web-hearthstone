const TRIGGER = {
    GET_GAME_STATE: 'trigger_getGameState',
    PLAY_MINION: 'trigger_playMinion',
    ATTACK: 'trigger_attack'
}, EVENT = {
    GET_GAME_STATE: 'event_getGameState',
    DEATH: 'event_death',
    DAMAGE: 'event_damage',
    ATTACK: 'event_attack'
};

module.exports = { TRIGGER, EVENT };