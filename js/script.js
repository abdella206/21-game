/// Variables

var cardsPlayer = [];

var playerScore;

var cardsDealer = [];

var dealerScore;

var numOfCardsPulled = 0;

var deckId;

var wins;

var losses;

var draws;
// Dom References

var hit;
var standBtn;
var deal;
var dealersCard;
var playerCard;
var dealerPoints;
var playerPoints;




const values = {
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "JACK": 10,
    "ACE": 10,
    "KING": 10,
    "QUEEN": 10
};
/// // Dom Manipulation
document.addEventListener('DOMContentLoaded', function (e) {
    hit = document.getElementById('btnhit');
    stand = document.getElementById('btnstand');
    deal = document.getElementById('deal');
    dealersCard = document.getElementById('dealercard');
    playersCard = document.getElementById('playercard');
    dealerPoints = document.getElementById('dealerscore');
    playerPoints = document.getElementById('playerscore');


    deal.addEventListener('click', function (e) {
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then(function (deckData) {
                return deckData.json();
            })
            .then(function (deckJson) {
                deckId = deckJson.deck_id;
                console.log(deckId);
                fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`)
                    .then(function (cardData) {
                        return cardData.json();
                    })
                    .then(function (cardJson) {
                        // console.log(cardJson);
                        // console.log("drew a card");
                        cardJson.cards.forEach(function (card, i) {

                            if (i % 2 == 0) {
                                cardsDealer.push(card);

                                console.log(cardsDealer + "dealer");
                                this.cardImg = document.createElement('img');
                                cardImg.src = card.image;
                                dealersCard.appendChild(cardImg);

                            } else {
                                cardsPlayer.push(card);
                                console.log(cardsPlayer + "player");
                                this.cardImg = document.createElement('img');
                                cardImg.src = card.image
                                playersCard.appendChild(cardImg);

                            }

                        })
                        // playerScore = parseInt(cardsPlayer[0].value) + parseInt(cardsPlayer[1].value);
                        // dealerScore = parseInt(cardsDealer[0].value) + parseInt(cardsDealer[1].value);


                        //console.log(cardJson.cards);


                        // for (let card of cardJson.cards) {
                        //     let value = values[card.value]


                        // }







                    })


            });
    })


    hit.addEventListener('click', function (e) {
      
      

    })

    stand.addEventListener('click', function (e) {
        console.log('stand')
    })




})

function getScore(hand) {
    return hand.reduce(function (sum, card) {
        //console.log(card, values[card.value])
        return sum + values[card.value]
    }, 0)


}





