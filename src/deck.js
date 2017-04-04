/**
 * Represents a deck of arbitrary cards.
 */
class Deck {
  constructor(cards = []) {
    this.cards = cards;
  }

  /**
   * Shuffle the deck; if the deck has less than 3 cards no shuffling occurs.
   * @returns true if the deck was altered.
   */
  shuffle() {
    if (this.cards.length < 3) return false;

    // note; this is a simple shuffle algorithm I found after a few minutes of research
    // also worth noting is that doesn't work with 2 cards because randomIndex is always 0
    // since shuffling a deck of 2 cards doesn't seem useful we don't worry about it
    // (you could reverse it if Math.random() > .5 or something if desired)
    let currentIndex = this.cards.length;
    let temporaryValue;
    let randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = this.cards[currentIndex];
      this.cards[currentIndex] = this.cards[randomIndex];
      this.cards[randomIndex] = temporaryValue;
    }

    return true;
  }

  /**
   * @returns the top card from this Deck or null if no cards.
   */
  deal() {
    if (this.cards.length === 0) return null;
    return this.cards.pop();
  }

  /**
   * Naturally deal all cards in this Deck into the specified number of hands.
   * @param hands - the number of hands to deal.
   * @returns array of hands (each hand is itself an array of cards).
   */
  dealAllToHands(hands) {
    if (!hands || hands < 2) return this.cards;

    const dealtHands = [];
    for (let i = 0; i < hands; i++) dealtHands[i] = [];

    // this is a simple implementation that uses the existing deal method
    // less simple but faster methods of dealing the full deck certainly exist
    let curHand = 0;
    while (this.length() > 0) {
      dealtHands[curHand].push(this.deal());
      if (curHand === hands - 1) curHand = 0;
      else curHand++;
    }

    return dealtHands;
  }

  length() {
    return this.cards.length;
  }
}

module.exports = Deck;
