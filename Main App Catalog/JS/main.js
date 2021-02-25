const CARDS = document.querySelectorAll('.memory-card');
const TABLE = document.querySelector('.memory-game-table');
const WINS_COUNTER = document.querySelector('.information-tab__wins__counter');
const ATTEMPTS_COUNTER = document.querySelector('.information-tab__attempts__counter');
const STEPS_COUNTER = document.querySelector('.information-tab__steps__counter');
const TOKENS_LIST = document.querySelector('.information-tab__found__tokens').children;

let hasFlippedCard = false;
let lockTable = false;
let firstCard, secondCard;
let steps = 0;
let wins = 0;
let foundPairs = 0;
let attempts = 1;


//Card flipping
function flipCard() {
    if (lockTable) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    STEPS_COUNTER.innerHTML = ++steps;

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    
    secondCard = this;

    checkForMatch();
}

//Card matching
function checkForMatch() {
    let isMatch = firstCard.dataset.cardtype === secondCard.dataset.cardtype;
    isMatch ? disableCards() : flipCardsBack();
}

//Disable flipping of cards
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    foundPairs++;
    if (foundPairs == 6) WINS_COUNTER.innerHTML = ++wins;

    addFoundToList(firstCard.dataset.cardtype);

    resetTable();
}

//Flip cards back
function flipCardsBack() {
    lockTable = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetTable();
    }, 1000);
}

//Reset table
function resetTable() {
    [hasFlippedCard, lockTable] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//Shuffle cards on table
function shuffleDeck() {
    CARDS.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    });
};

//Shuffle card on load
shuffleDeck();

//New game
function startNewGame() {
    TABLE.classList.add('no-clicks');
    CARDS.forEach(card => card.classList.remove('flip'));
    ATTEMPTS_COUNTER.innerHTML = ++attempts;
    STEPS_COUNTER.innerHTML = steps = 0;
    foundPairs = 0;
    
    for (let token of TOKENS_LIST) {
        token.classList.remove('found-card-token--vissible');
    };

    setTimeout(() => {
        shuffleDeck();
        CARDS.forEach(card => card.addEventListener('click', flipCard));
        TABLE.classList.remove('no-clicks');
    }, 1000)
}

//Colour token on list
function addFoundToList(cardType) {
    let token = document.querySelector('[data-token="'+cardType+'"]');
    token.classList.add('found-card-token--vissible');
}

CARDS.forEach(card => card.addEventListener('click', flipCard));