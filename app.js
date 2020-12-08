const container = document.querySelector('.container-fluid')
const easyBtn = document.querySelector('#easyBtn')
const normalBtn = document.querySelector('#normalBtn')
const hardBtn = document.querySelector('#hardBtn')
const drawBtn = document.querySelector('#drawBtn')
const currentCard = document.querySelector('#currentCard')
let easyCards = 10
let normalCards = 5
let hardCards = 5
const cardNameBeginning = "img/card-"
const cardNameExtension = ".jpg"
let gameDeck = []
let startingDeck = []
let z = 0

container.addEventListener('click', callInitGame , false)

function callInitGame(e) {
    if(e.target.tagName == 'BUTTON') {
        initGame(e.target)
    }
}

function initGame(difficulty) {
    let deck = []

    switch(difficulty) {
        case easyBtn:
            addToDeck("i", easyCards, deck)
            break;
        case normalBtn:
            addToDeck("i", easyCards, deck)
            addToDeck("ii", normalCards, deck)
            break;
        case hardBtn:
            addToDeck("i", easyCards, deck)
            addToDeck("ii", normalCards, deck)
            addToDeck("iii", hardCards, deck)
        default:
      }

      gameDeck = deck
      startingDeck = JSON.parse(JSON.stringify(gameDeck))
      z = startingDeck.length
      hideElements()
      shuffle(gameDeck)
      showNewElements()
      container.removeEventListener('click', callInitGame)
}

drawBtn.addEventListener('click', draw)

function addToDeck(level, numberOfCards, deck) {
    for (let i = 0; i < numberOfCards; i++) {
        deck.push(level + (i +1))    
    }
}

function hideElements() {
    easyBtn.style.display = "none"
    normalBtn.style.display = "none"
    hardBtn.style.display = "none"
    document.querySelector('#diff_selector').style.display = "none"
}

function shuffle(deckToShuffle) {
    for (let i = deckToShuffle.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i)
        let temp = deckToShuffle[i]
        deckToShuffle[i] = deckToShuffle[j]
        deckToShuffle[j] = temp
    }
}

function showNewElements() {
    drawBtn.style.display = "block"
    currentCard.style.display = "block"
    drawDeck()
}

function drawDeck() {
    let shiftTop = 1
    let shiftLeft = 1
    z = startingDeck.length
    for (let i = 0; i < startingDeck.length; i++) {
        var newCard = document.createElement("IMG")
        newCard.classList.add("card-img-top")
        newCard.classList.add("deck-img")
        newCard.style.position = "absolute"
        newCard.style.top = shiftTop++ + "px"
        newCard.style.left = shiftLeft++ + "px"
        newCard.style.zIndex = z--;
        newCard.style.display = "block";
        newCard.src = "img/back.jpg"
        document.querySelector('.card').appendChild(newCard)
    }
    var cardImgs = document.querySelectorAll(".deck-img")
    cardImgs[cardImgs.length - 1].classList.add("card-with-shadow")
}

function draw() {
    var cardImgs = document.querySelectorAll(".deck-img")
    document.querySelector('.card').removeChild(cardImgs[cardImgs.length - 1])
    cardImgs[0].style.display = "none"
    currentCard.style.zIndex = startingDeck.length + 1
    currentCard.src = cardNameBeginning + gameDeck[0] + cardNameExtension
    gameDeck.splice(0,1)
    if(gameDeck.length == 0) {
        gameDeck = JSON.parse(JSON.stringify(startingDeck))
        shuffle(gameDeck)
        drawDeck()
    }
}