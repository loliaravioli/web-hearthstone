// use this to connect "signals" and "slots"

export class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    emit(event, ...args) {
        if (this.events[event]) {
            this.events[event].forEach(listener => listener(...args));
        }
    }
}

/*
how to use:

    const eventEmitter = new EventEmitter();

    eventEmitter.on('cardUpdated', (card) => {
        const cardView = cardViews.get(card);
        if (cardView) {
            cardView.update();
        }
    });

then

    eventEmitter.emit('cardUpdated', card);
*/