/* Create variables for card types */
const values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
const suits = ["D","H","C","S"];

/* Empty array for creating deck and player hands*/
let deck = [];
let centerPile = [];
let match = false

/* Assign HTML elements to variables */
const playerYDom = document.getElementById("hand-Y");
const playerXDom = document.getElementById("hand-X");
const centerDeck = document.getElementById("centerDeck");
const cardArt = document.getElementById("cardCenter")
const centerContainer = document.getElementsByClassName("containerDeck")
const slapButton = document.getElementById("slapButton");
const drawXButton = document.getElementById("drawXButton");
const gameStatus = document.getElementById("gameStatus");
const currentPlayerDom = document.getElementById("currentPlayer");
const resetButton = document.getElementById("resetButton");
const roundStatus = document.getElementById("roundStatus")
const h1 = document.getElementById("title")


/*Players
- Player class accepts playerX (the human) or playerY (the computer) as paramters
as well as a player array
*/

class Player {
    constructor (player, hand){
        this.player = player
        this.hand = hand
        
    }
}

/* Card class accepts a string as identity (for exmaple Ace of Spades is 'S-A'
    This is crucial in linking to the images in HTML as they share the same string as HTML image id's*/
class Card {
    constructor (identity,image){
        this.identity = identity
        this.image = image
    }
}

/* Deal hands to players by splitting shuffled deck array in half */
let playerYHand = deck.slice(0, 26);
let playerXHand = deck.slice(26, 52);

/* In current state, playerX is the human player and playerY is the computer */
let playerX = new Player ('playerX', playerXHand);
let playerY = new Player ('playerY', playerYHand);

/* Create variables for currentPlayer */
let currentPlayer = null
if(currentPlayer === null){
    currentPlayer = playerX
}
/* Make the deck in a function
   - Create functions for making a deck 
  - createDeck() function pulls from two arrays to create one deck array
  -  A for loop is run to make each index a new instance of the Card class
  -  The second argument, image, is linked to the string in HTML as an ID */

function createDeck() {
    for(let ix=0; ix<suits.length; ix++){
        for(let iy=0; iy<values.length; iy++){
        deck.push(suits[ix] + '-' + values[iy])
        }
    }
    for(let ix=0; ix<deck.length;ix++){
        deck[ix] = new Card(deck[ix],document.getElementById(deck[ix]))
    }return deck
    
    }

/* shuffleDeck() uses .sort() by a range of [-.5, .5) to randomly sort the array */
function shuffleDeck(deck){
    deck.sort(() => Math.random() - 0.5);
    return deck
} 

/* Show points displays the player or computer array length in their stack of cards*/
function showPoints(){
    playerXDom.innerText = `Player X ${playerXHand.length}`
    playerYDom.innerText = `Computer ${playerYHand.length}`
}
/* Reset the game with resetGame
   - refers to above functions 
   - shuffles deck evenly to computer and player
   - removes the images from the center pile
   - changes text of HTML element #gameStatus */
function resetGame(){
    deck = [];
    centerPile = [];
    createDeck();
    shuffleDeck(deck);
    playerYHand = deck.slice(0, 26);
    playerXHand = deck.slice(26, 52);
    centerDeck.style.backgroundImage = "";
    currentPlayerDom.innerHTML = "";
    showPoints();
    gameStatus.innerText = "New Game. Cards shuffled! Click Draw to begin";
}

/* Changes the background image in CSS to link the appropriate class instance HTML link */
function cardImage(){
    centerDeck.style.backgroundImage = `url('${centerPile[centerPile.length-1].image.src}')`;
}

/* Function draw accepts an argument of playerHand as an array (either computer array or player array)
   - The current player information is reset in the HTML
   - The appropriate playerHand array is popped into the center pile array */
function draw(playerHand){
    currentPlayerDom.innerHTML = ""
    roundStatus.innerText = ""
    centerPile.push(playerHand.pop());
    /* If statement creates a comparison of last two integers in center array 
    and returns booleans for later reference */
        if(centerPile.length >=2){
                if((centerPile[centerPile.length-1].identity.charAt(2)) === (centerPile[centerPile.length-2].identity.charAt(2))){ 
                    console.log('Exact match in value')
                    match = true 
                }else if((centerPile[centerPile.length-1].identity.charAt(2)) === 'A'){
                    match = false
                }else if((centerPile[centerPile.length-1].identity.charAt(2)) === 'K'){
                    match = false
                }else if((centerPile[centerPile.length-1].identity.charAt(2)) === 'Q'){
                    match = false
                }else if((centerPile[centerPile.length-1].identity.charAt(2)) === 'J'){
                    match = false
                }else{
                    match = false    
                }
            /* If statement for player displays drawn card in the currentPLayerDom inneTtext */
            if(currentPlayer === "playerX"){
                roundStatus.innerText = ""
                if((centerPile[centerPile.length-1].identity.charAt(2))=== "1"){
                    currentPlayerDom.innerText = "You drew a 10"
                }
                else {
                    currentPlayerDom.innerText = `You drew a ${centerPile[centerPile.length-1].identity.charAt(2)}`
                }
            /* The following four if statements check if the player drew a Face card. 
                - If returned true, the computer draws the appropriate amount of cards determined by while loop
                - Card is drawn into bottom of center pile array so that it is not read by previous functions! */
            if((centerPile[centerPile.length-1].identity.charAt(2))=== 'A'){
                currentPlayerDom.innerText = "Nice! You drew an ACE. Computer loses 4 cards"
                let xi = 0
                while(xi<4){
                    centerPile.unshift(playerYHand.pop())
                    windCondition()
                    xi += 1;
                }
            }
            if((centerPile[centerPile.length-1].identity.charAt(2))=== 'K'){
                currentPlayerDom.innerText = "You drew a King! Computer loses 3 cards"
                let xi = 0
                while(xi<3){
                    centerPile.unshift(playerYHand.pop())
                    windCondition()
                    xi += 1;
                }
            }
            if((centerPile[centerPile.length-1].identity.charAt(2))=== 'Q'){
                currentPlayerDom.innerText = "You drew an Queen. Computer loses 2 cards"
                let xi = 0
                while(xi<2){
                    centerPile.unshift(playerYHand.pop())
                    windCondition()
                    xi += 1;
                }
            }
            if((centerPile[centerPile.length-1].identity.charAt(2))=== 'J'){
                console.log('playerX got a Jack')
                currentPlayerDom.innerText = "You drew an Jack. Computer loses a card"
                let xi = 0
                while(xi<1){
                    centerPile.push(playerYHand.pop())
                    console.log(playerYHand);
                    xi += 1;
                }
            }
        }     
    } 
    /* The following functions are run. See timerFunction() for computer turn initiation */
    cardImage()
    showPoints()
    windCondition()
    timerFunction ()
} 
    
/* Condition for if center pile is empties continues the game based off of current player
    - timerFunction () initiates computer turn*/    
if(centerPile.length = 0){
    if(currentPlayer="playerX"){
        currentPlayer = "playerY"
        timerFunction ()
    }else if(currentPlayer ="playerY"){
        currentPlayer ="playerX"
    }    
}    
     
/* Function for below event listener
   - Draw button is clicked by player */
function drawPlayerX(){
   if(currentPlayer === "playerX") {
    draw(playerXHand)
}
}

drawXButton.addEventListener("click", drawPlayerX)

/* Reset button is clicked to run resetGame()*/
resetButton.addEventListener("click",resetGame)

/* Create a timer and callback function for determining computer move
   - Intiatalizes computer draw
   - Counts down from 5 every time called to give space for computer move
*/

let ticks = 6
let interval 

drawXButton.addEventListener('click',function (){
    ticks = 5
    clearInterval(interval);
    interval = setInterval(timerFunction, 500);
})

/* timerFucntion initiates the computer turn after countdown reaches 0
   - draw() is called with playerYHand array
   - The playerYHand array is sent through line 129 of draw() function
   - Then code is read from line 238 to check for face cards
   - If face cards are returned as true, the appropriate cards are lost from player hand*/
function timerFunction(){
    gameStatus.innerText = "Computer is drawing their Card..."
    ticks--
    console.log(ticks)
    if(ticks === 0){
        clearInterval(interval);
        currentPlayer = "playerY"
        draw(playerYHand)
        if(currentPlayer === "playerY"){
            if((centerPile[centerPile.length-1].identity.charAt(2))=== "1"){
                currentPlayerDom.innerText = "You drew a 10"
            }
            else {
                currentPlayerDom.innerText = `The computer drew a ${centerPile[centerPile.length-1].identity.charAt(2)}`
            }
            if((centerPile[centerPile.length-1].identity.charAt(2))=== 'A'){
                currentPlayerDom.innerText = "Uh oh! Computer drew an ACE. You lose 4 cards"
                let xi = 0
                while(xi<4){
                    centerPile.unshift(playerXHand.pop())
                    xi += 1;
                }      
            }
            if((centerPile[centerPile.length-1].identity.charAt(2))=== 'K'){
                currentPlayerDom.innerText = "Wow! Computer drew a King. You lose 3 cards"
                let xi = 0
                while (xi<3){
                    centerPile.unshift(playerXHand.pop())
                    cardImage()
                    xi +=1;
                }        
            }        
            if((centerPile[centerPile.length-1].identity.charAt(2))=== 'Q'){
                currentPlayerDom.innerText = "Wow! Computer drew a Queen. You lose 2 cards"
                let xi = 0
                while(xi<2){
                    centerPile.unshift(playerXHand.pop())
                    xi+=1
                }   
            }
            if((centerPile[centerPile.length-1].identity.charAt(2))=== 'J'){
                currentPlayerDom.innerText = "Computer drew a Jack. You lose 1 cards"
                let xi = 0
                while(xi<1){
                    centerPile.unshift(playerXHand.pop())
                    xi+=1
                }
         }
    currentPlayer = "playerX"
    gameStatus.innerText = "Your turn! Click Draw"
        }
    showPoints()
    windCondition()
    }
}


/* Assign space bar to check booleans from line 115 to 129
  - Determines if cards are won or lost by player
  - Shuffles center deck into either player or computer hand
  - player is instructed to hit draw to continue */
slapButton.addEventListener('click', event => {
    // if (event.code === 'Space') {
      if(match === true){
        playerXHand.push(centerPile);
        shuffleDeck(playerXHand);
        centerDeck.style.backgroundImage = "";
        roundStatus.innerText = "Good slap! You win this pile. Hit Draw to continue"
        showPoints()
        currentPlayer = "playerY"
        timerFunction()
      }
      else if(match === false){
        playerYHand.push(centerPile);
        shuffleDeck(playerYHand);
        centerDeck.style.backgroundImage = "";
        roundStatus.innerText = "Bad Slap... You lose this pile. Hit Draw to continue"
        showPoints()
        currentPlayer = "playerY"
        timerFunction()
      }
})

/* Player loses if computer has 52 cards or if they run out of cards
    Player wins if they have 52 cards or if the computer runs out of cards */
function windCondition(){
  if(playerXHand.length === 52){
    console.log('You win!')
    showPoints()
    h1.innerText = "You win!"
    gameStatus.innerText = "Want to play again? Hit reset!"
  }
  if(playerYHand.length === 52){
    console.log('You lose!')
    showPoints()
    h1.innerText = "You win!"
    gameStatus.innerText = "Want to play again? Hit reset!"
  }
  if(playerXHand.length === 0){
    console.log('You lose!')
    showPoints()
    h1.innerText = "You lose!"
    gameStatus.innerText = "Want to play again? Hit reset!"
  }
  if(playerYHand.length === 0){
    console.log('You win!')
    showPoints()
    h1.innerText = "You win!"
    gameStatus.innerText = "Want to play again? Hit reset!"
  }
}