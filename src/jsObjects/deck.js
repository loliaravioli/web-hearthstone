import { king_krush } from './cards/minioncards/hunter/king_krush.js';

export class Deck {
	constructor() {
		this.cards = this.freshDeck();
		this.shuffle();
	}

	drawCard() {
		return this.cards.pop();
	}

	topCard() {
		return this.cards[0];
	}

	count() {
		return this.cards.length;
	}

	isEmpty() {
		return this.cards.length === 0;
	}

	// shuffles the cards randomly
	shuffle() {
		for (let i = this.numberOfCards - 1; i > 0; i--) {
			const newIndex = Math.floor(Math.random() * (i + 1));
			const oldValue = this.cards[newIndex];

			this.cards[newIndex] = this.cards[i];
			this.cards[i] = oldValue;
		}
	}

	freshDeck() {
		return [
			new king_krush(),
			new king_krush(),
			new king_krush(),
			new king_krush(),
			new king_krush(),
			new king_krush(),
			new king_krush(),
			new king_krush(),
			new king_krush(),
			new king_krush(),
			new king_krush(),
			new king_krush(),
			new king_krush(),
			new king_krush(),
			new king_krush(),
			new king_krush(),
			new king_krush(),
			new king_krush(),
			new king_krush(),
			new king_krush(),
			new king_krush(),
			new king_krush(),
			new king_krush(),
			new king_krush(),
			new king_krush(),
			new king_krush(),
			new king_krush(),
			new king_krush(),
			new king_krush(),
			new king_krush(),
			new king_krush(),
			new king_krush(),
			new king_krush(),
			new king_krush(),
			new king_krush(),
			new king_krush(),
			new king_krush(),
			new king_krush(),
			new king_krush(),
			new king_krush(),
			new king_krush()
		]
	}
}