# Game Type: Ratscrew

![Ratscrew](https://imgur.com/1PIHDox.png "Ratscrew")
## Rules 
This is a game of Ratscrew. The human player and computer are given 26 cards. The goal of the game is to either have all cards in your deck or to deplete the computer's hand to 0. In each turn, the player or computer draws a single card into the center pile and puts it face up. This game relies heavily on drawing face cards. Each face card has a different level of power. If a Jack is drawn by the player, the computer draws 1 card into the bottom of the center pile. If a queen is drawn, the computer draws 2 cards into the cetner. A king equates to drawing 3 and an Ace equates to drawing 4. If two identical numbered cards are drawn on top of each other (suits do not matter), the player can slap and takes the entire center pile. The game moves quickly because the face cards hold so much power! Good luck!

## First Round
![Ratscrew](https://i.imgur.com/MQCaI33.png "Ratscrew")

When the player hits reset to start the game, they are instructed to hit Draw. When Draw is clicked, the computer plays their first card. Then the player clicks Draw and draws card. Computer's pile of cards is on top and the player's is on the bottom. Their number of cards are constantly updated throughout the game to see who is winning and who is losing.

## Face Card Rules
![Ratscrew](https://imgur.com/MIvw0ig.png "Ratscrew")
Throughout the game, messages are displayed at the left of the screen to show what card was drawn. If a face card is drawn, the message will show how many cards the correspoding player will lose. The number is updated once draw is clicked by the human player. 

## Player Slap
![Ratscrew](https://i.imgur.com/Xl8aSa5.png "Ratscrew")
If a player wishes to slap, they hit the slap button. The player slaps if they think they saw two identical numbered cards in a row. If they were correct, they will take the entire center pile and the game continues. If they are wrong, the computer takes the center pile instead.

## Win/Lose conditions
![Ratscrew](https://i.imgur.com/35LO4ZM.png "Ratscrew")
If either player runs out of cards, the game is over. Whoever runs out first loses. Whoever has 52 cards in their hand wins. It is usually a fast game as someone will more likely reach 0 than get to 52.

## Technologies Used
I used HTML to create clickable buttons such as reset, draw and slap. The HTML is dynamically updated throughout the game by Javascript. All of the card images are linked by my Imgur in my HTML.

I used CSS to style the game, change the font style and layout of the game. I made a gradient for the game and made it the background. I resized the card images and made the center pile background dynamically accessible by the Javascript.

I used javascript for functionality and DOM manipulation. I mostly used conditionals as "if" statements as well as both "for" loops and "while" loops to create decks and repeat functions within conditionals. I used javascript to talk to the HTML and CSS in order to change display text and images dynamically to reflect the current state of the game.

## Challenging javscript
![Ratscrew](https://i.imgur.com/LguTM9t.png "Ratscrew")

![Ratscrew](https://i.imgur.com/yBFb1JL.png "Ratscrew")


## Link to Ratscrew
https://bbakercello.github.io/Ratscrew_Share/

## Next Steps

I would like to style the game more and work on its layout. Much of my time was spent on javascript and making the game work so I would like to add some animations and change the sizing of the cards. 

I would also like to make the computer more dynamic. I could use math.random to play with the timer amounts so that it doesn't take the same amount of time to play a card. Also, I would like to give the computer the ability to slap. This really would bring the game to the next level and is something I would like to do as soon as possible. In the future, it would be great if two players could play the game. I think that would require a lot of reworking, but it could be possible!
