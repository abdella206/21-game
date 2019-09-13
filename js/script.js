/// Variables

var cardsPlayer = [];

var playerScore;

var cardsDealer = [];

var dealerScore;

var gameStarted = false;

var deckId;

var win = false;

var losse = false;

var gameOver = false;

var draw = false;



// Dom References

var hitDealer;
var hitPlayer;
var stand;
var deal;
var dealersCard;
var playersCard;
var dealerPoints;
var playerPoints;
var rest;
var clearImg;
var messageD;
var messageP;
//var hiddenCard;



var values = {
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
    "ACE": 11,
    "KING": 10,
    "QUEEN": 10
};
/// // Dom Manipulation
document.addEventListener('DOMContentLoaded', function (e) {
    hitDealer = document.getElementById('btnhit');
    hitDealer.textContent = "test123"
    hitPlayer = document.getElementById('btnhit2');
    stand = document.getElementById('btnstand');
    deal = document.getElementById('deal');
    dealersCard = document.getElementById('dealercard');
    playersCard = document.getElementById('playercard');
    dealerPoints = document.getElementById('dealerscore');
    playerPoints = document.getElementById('playerscore');
    rest = document.getElementById('reset');
    clearImg = document.getElementsByClassName('img')
    messageD = document.getElementById("messageD");
    messageP = document.getElementById("messageP");
    // hiddenCards = document.getElementById('hiddencard')



    deal.addEventListener('click', function (e) {
        gameStarted = true;
        gameOver = false;
        win = false;
        if (cardsDealer.length == 0) {
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
                            // var hiddenCard = document.createElement('img')
                            // hiddenCard.src = "css/img/cardback2.jpg"
                            //   hiddenCards.appendChild(hiddenCard);
                            cardJson.cards.forEach(function (card, i) {

                                if (i % 2 == 0) {
                                    cardsDealer.push(card);

                                    console.log(cardsDealer + "dealer");
                                    var cardImg = document.createElement('img');

                                    cardImg.classList.add("img")
                                    cardImg.src = card.image;

                                    dealersCard.appendChild(cardImg);

                                    dealerScore = getScore(cardsDealer);
                                    dealerPoints.textContent = "Dealer Score! " + dealerScore;
                                    checkWin();



                                } else {
                                    cardsPlayer.push(card);
                                    console.log(cardsPlayer + "player");
                                    var cardImg = document.createElement('img');
                                    cardImg.classList.add("img")
                                    cardImg.src = card.image
                                    playersCard.appendChild(cardImg);
                                    playerScore = getScore(cardsPlayer);
                                    playerPoints.textContent = "Player Score! " + playerScore;
                                    checkWin();

                                }


                            })

                        })


                });
        }

    })


    hitDealer.addEventListener('click', hitD);

    hitPlayer.addEventListener('click', hitP);


    stand.addEventListener('click', function (e) {
        hitD();
        console.log("stand")
    })
})

reset.addEventListener('click', resetB)




function getScore(hand) {
    return hand.reduce((sum, card) => {
        return sum + values[card.value]
    }, 0);
}

// function getScore(hand) {
//     return hand.reduce(function (sum, card) {
//         return sum + values[card.value]
//     }, 0)

// }




function checkBust() {
    if (playerScore > 21) {
        win = true;
        gameOver = true;
        messageD.textContent = " Dealer Wins!!!"
        console.log("Dealer Win");
    }
    else if (dealerScore > 21) {
        win = true;
        gameOver = true;
        messageP.textContent = " Player Wins!!!"
        console.log("Player won");
    }
}


function checkWin() {
    if (playerScore == 21) {
        win = true;
        gameOver = true;
        messageP.textContent = " Player Wins!!!"
        console.log("Player Wins");
    }
    else if (dealerScore == 21) {
        win = true;
        gameOver = true;
        messageD.textContent = " Dealer Wins!!!"
        console.log("Dealer Wins");
    } else if (playerScore >= 15){
                values.ACE = 1;
            }

}


// function aceV(){
//     if (dealerScore > 15){
//         values.ACE = 1;
//     } else if (playerScore >= 15){
//         values.ACE = 1;
//     }
// }

function aI() {
    if (playerScore > 15) {
        hitD();
        setTimeout()

    }
}



function hitD(e) {
    if (cardsDealer.length < 4) {
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
            .then(function (cardData) {
                return cardData.json();
            })
            .then(function (cardJson) {
                // console.log(cardJson);
                // console.log("drew a card");
                cardJson.cards.forEach(function (card, i) {


                    cardsDealer.push(card);

                    console.log(cardsDealer + "dealer");
                    var cardImg = document.createElement('img');
                    cardImg.classList.add("img")
                    cardImg.src = card.image;
                    dealersCard.appendChild(cardImg);
                    dealerScore = getScore(cardsDealer);
                    dealerPoints.textContent = "Dealer Score! " + dealerScore;
                    checkBust();
                    checkWin();
                    


                })

            })
    }
}




function hitP(e) {
    if (cardsPlayer.length < 4) {
        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
            .then(function (cardData) {
                return cardData.json();
            })
            .then(function (cardJson) {
                // console.log(cardJson);
                // console.log("drew a card");
                cardJson.cards.forEach(function (card, i) {


                    cardsPlayer.push(card);
                    console.log(cardsPlayer + "player");
                    var cardImg = document.createElement('img');
                    cardImg.classList.add("img")
                    cardImg.src = card.image
                    playersCard.appendChild(cardImg);
                    playerScore = getScore(cardsPlayer);
                    playerPoints.textContent = "Player Score! " + playerScore;
                    checkBust();
                    checkWin();
                    
                })
            })
    }
}

function resetB(e) {

    for (i = 0; i < clearImg.length; i++) {
        clearImg[i].src = "";
    }

    cardsPlayer = [];
    cardsDealer = [];
    dealerScore = 0;
    playerScore = 0;
    dealerPoints.textContent = "";
    playerPoints.textContent = "";
    messageP.textContent = "";
    messageD.textContent = "";
    gameOver = true;
    console.log("reset")

}




