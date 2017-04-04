# Deck Shuffle and Dealing
#### Al Whiting; alwhiting@gmail.com

## Setup
### Pre-Reqs:
* NodeJS version 6.10.1 minimum; this is the version tested.

### Install Steps:
1. clone the git repository somewhere.
2. change directory to the project root.
3. install required libraries (all related to testing) by running: `npm install`

## Running
This is run simply using unit tests; `npm test` from the root directory of the project to run them.

## Implementation Notes
This is a relatively simple deck implementation. I have used a common two-character format (suit and value) to represent a card in my tests but as this implementation does not provide any sorting or comparison functionality a card could technically be any value.
In reality there would probably be value in having a Card class and the Deck would only contain a collection of Cards.

The `shuffle` method is a standard shuffling algorithm. It does not shuffle a deck smaller than 3 and the method will short circuit before running the algorithm if this is the case.

The `deal` method simply deals/returns the top card.

The `dealAllToHands` method deals the whole deck into the specified number of hands in a natural way: one card to each hand one after another. An array of hands is returned. This implementation is simple; undoubtedly more efficient implementations are possible however the implementation uses the existing `deal()` method and allows it to update the Deck's state normally.
