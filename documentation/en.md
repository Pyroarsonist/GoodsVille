# GoodsVille

## Description

_GoodsVille_ - online platform implemented on the basis of an auction. Each user can submit their bids. Each lot has its own room. In order to be able to bid, you need to confirm your participation in the room with an interested lot. This can be done before bidding, time which was set by lot's author. The room stores in itself: information about the lot, the start time of the auction and the list of participants. Participants receive a notification of the beginning and end of bidding. If no bids have been made, then the bidding is postponed and a notification about a new time is sent to all participants with a proposal to refuse to bid for this lot.

## Implementation Features

- Registration / authorization
- User account
- The list of rooms will display the number of participants, the id of the room, the name of the product, a brief description of the product, the classification of the product, the initial price of the product, the current price of the product (if bidding is already underway), the number of bids, the start time of the auction and status (has not yet started / in process / completed)
- In the room itself, in addition to the already listed, there will be a list of bidders and a full description of the goods instead of a short one.
- Bids for a certain lot.
- At each new bet, the corresponding record is added to the database and the timer countdown starts again
- Check the balance at bets. Since the user will have the opportunity to participate in several trades at the same time, it is necessary to ensure that the total amount of his bids does not exceed the balance on the account.
- Notifications
