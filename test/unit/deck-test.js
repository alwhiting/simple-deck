const Deck = require("../../src/deck");

// quick helper to generate a typical 52 card deck
function fullDeck() {
  const cards = [];
  ["s",  "c", "d", "h"].forEach((suit) => {
    for (let i = 2; i < 11; i++) cards.push(i + suit);
    ["a", "j", "q", "k"].forEach((special) => cards.push(special + suit));
  });
  return cards;
}

function checkDealtCards(handNumber, handCount, originalCards, hand) {
  const handExpected = [];
  let cur = originalCards.length - handNumber - 1;
  while (cur > -1) {
    handExpected.push(originalCards[cur]);
    cur -= handCount;
  }
  expect(handExpected).to.eql(hand);
}

describe(__filename, function () {

  describe("Empty deck", function () {
    beforeEach(function () {
      this.sut = new Deck();
    });
    describe("shuffling", function () {
      it("should not execute algorithm on empty deck", function () {
        this.sut.shuffle().should.equal(false);
      });
    });
    describe("dealing", function () {
      it("should return null from empty deck", function () {
        expect(this.sut.deal()).to.not.exist;
      });
    });
  });

  describe("Single card deck", function () {
    beforeEach(function () {
      this.sut = new Deck(["as"]);
    });
    describe("shuffling", function () {
      it("should not execute algorithm on a single card", function () {
        this.sut.shuffle().should.equal(false);
      });
    });
    describe("dealing", function () {
      it("should return the only card and be empty afterwards", function () {
        this.sut.deal().should.eql("as");
        this.sut.length().should.equal(0);
        expect(this.sut.deal()).to.not.exist;
      });
    });
  });

  describe("Two card deck", function () {
    beforeEach(function () {
      this.sut = new Deck(["as", "5c"]);
    });
    describe("shuffling", function () {
      it("should not execute algorithm for two cards", function () {
        this.sut.shuffle().should.equal(false);
      });
      it("should not have changed the cards", function () {
        this.sut.shuffle();
        this.sut.cards.should.eql(["as", "5c"]);
      });
    });
    describe("dealing", function () {
      it("single should return a card and one should be left", function () {
        this.sut.deal().should.eql("5c");
        this.sut.length().should.equal(1);
      });
    });
  });

  describe("Full deck", function () {
    beforeEach(function () {
      this.originalCards = fullDeck();
      this.originalOrder = this.originalCards.join("");
      // quick deep copy the original cards so we have a ref to them
      this.sut = new Deck(JSON.parse(JSON.stringify(this.originalCards)));
    });
    it("should have 52 cards", function () {
      this.sut.length().should.equal(52);
    });
    it("should have no dupes", function () {
      const cardCount = {};
      this.sut.cards.forEach((card) => {
        if (!cardCount[card]) cardCount[card] = 1;
        else cardCount[card] = cardCount + 1;
      });
      Object.keys(cardCount).forEach((card) => expect(cardCount[card]).to.equal(1));
    });
    describe("shuffling", function () {
      beforeEach(function () {
        this.firstDidShuffle = this.sut.shuffle();
        this.firstShuffle = this.sut.cards.join("");
        this.secondDidShuffle = this.sut.shuffle();
        this.secondShuffle = this.sut.cards.join("");
      });
      it("should execute the algorithm", function () {
        this.firstDidShuffle.should.equal(true);
        this.secondDidShuffle.should.equal(true);
      });
      it("should have changed the cards with each shuffle", function () {
        this.originalOrder.should.not.eql(this.firstShuffle);
        this.originalOrder.should.not.eql(this.secondShuffle);
        this.firstShuffle.should.not.eql(this.secondShuffle);
      });
    });
    describe("dealing", function () {
      it("single should return first card and 51 remain", function () {
        this.sut.deal().should.eql(this.originalOrder.substring(this.originalOrder.length - 2, this.originalOrder.length));
        this.sut.length().should.equal(51);
      });
    });
    describe("dealing the whole deck", function () {
      it("should deal the full deck into a single hand", function () {
        const fullDeal = this.sut.dealAllToHands();
        fullDeal.join("").should.equal(this.originalOrder);
      });
      describe("should deal the full deck into 5 hands", function () {
        beforeEach(function () {
          this.hands = this.sut.dealAllToHands(5);
        });
        it("should have returned 5 hands", function () {
          expect(this.hands.length).to.equal(5);
        });
        it("should have 11 cards in the first two hands", function () {
          expect(this.hands[0].length).to.equal(11);
          expect(this.hands[1].length).to.equal(11);
        });
        it("should have 10 cards in the last three hands", function () {
          expect(this.hands[2].length).to.equal(10);
          expect(this.hands[3].length).to.equal(10);
          expect(this.hands[4].length).to.equal(10);
        });
        it("should have placed the correct cards in each hand", function () {
          this.hands.forEach((hand, i) => checkDealtCards(i, this.hands.length, this.originalCards, hand));
        });
      });
    });
  });

});