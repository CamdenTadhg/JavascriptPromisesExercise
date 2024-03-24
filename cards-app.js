//make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Console.log the value and the suit. 
axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
    .then(res => {
        console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
    });


//Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Make a request from the same API to get one more card from the same deck. Once you have both cards, console.log the value and suit of both cards
let firstResponse = {}
axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
    .then(res => {
        firstResponse = res.data.cards[0];
        return axios.get(`https://deckofcardsapi.com/api/deck/${res.data.deck_id}/draw/?count=1`)
    })
    .then(res => {
        console.log(`${firstResponse.value} of ${firstResponse.suit} and ${res.data.cards[0].value} of  ${res.data.cards[0].suit}`);
    })

// Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck
const $buttonDiv = $('#button-div');
const $cardDiv = $('#card-div');
const $drawButton = $('#draw-button');
$drawButton.hide()
let deckID;
let zIndex = 0;

$(document).ready(function() {
    axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(res =>{
            deckID = res.data.deck_id;
            console.log(deckID)
            $drawButton.show();
        });
});

$drawButton.on('click', function() {
    axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/`)
        .then(res => {
            if (res.data.remaining === 0){
                console.log(res);
                $cardImage = $(`<img style='z-index:${zIndex}' class='card-image' src=${res.data.cards[0].image}>`);
                $cardDiv.append($cardImage);
                $drawButton.hide();

            } else {
                console.log(res);
                $cardImage = $(`<img style='z-index:${zIndex}' class='card-image' src=${res.data.cards[0].image}>`);
                $cardDiv.append($cardImage);
                zIndex++;
            }
        });
});


