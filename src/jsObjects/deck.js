import { king_krush } from './cards/minioncards/hunter/king_krush.js';
import { water_elemental } from './cards/minioncards/mage/water_elemental.js';

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

	shuffle() {
		for (let i = this.cards.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
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
			new water_elemental(),
			new water_elemental(),
			new water_elemental(),
			new water_elemental(),
			new water_elemental(),
			new water_elemental(),
			new water_elemental(),
			new water_elemental(),
			new water_elemental(),
			new water_elemental(),
			new water_elemental(),
			new water_elemental(),
			new water_elemental(),
			new water_elemental(),
			new water_elemental()
		]
	}
}