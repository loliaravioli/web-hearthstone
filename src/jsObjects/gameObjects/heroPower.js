export class HeroPower {
    constructor() {
        this.mana = 2;
        this.isPlayable = false;
        this.used = false;
        this.effect = function() { console.log('using heropower'); };
    }

    triggerEffect() {
        this.effect();
    }
}