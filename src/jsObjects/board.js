// handles the board state for ONE user

export class Board {
    constructor() {
        this.minions = [];
    }

    count() {
        return this.minions.length;
    }

    isFull() {
        return this.minions.length == 7;
    }

    isEmpty() {
        return this.minions.length == 0;
    }

    addMinion(minion, position) {
        this.minions.splice(position, 0, minion);
    }

    removeMinion(position) {
        this.minions.splice(position, 1);
    }
}