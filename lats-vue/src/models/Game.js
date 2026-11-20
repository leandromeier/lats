import Board from './Board.js'
import Card from './Card.js'
import SuperCard from './SuperCard.js'

export default class Game {

    constructor(numberOfPlayers = 1) {
        // eventually, the game will have several boards
        this.boards = new Array(numberOfPlayers).fill(null).map(() => new Board())
        this.currentRound = 0
        this.cards = new Array(18).fill(null).map(() => new Card())
        this.setUpGame()
    }

    setUpGame() {
        // set up the board(s)
        this.boards.forEach(board => {
            board.setUpBoard()
        })
        this.cards.forEach(card => {
            card.setUpCard()
            card.setUpGraph(["(0:0);(0:1)", "(0:1);(1:1)"])
        })
        this.cards.push(new SuperCard())
        // eventually, we will set up the cards with different content
        // and we will also set up the boards with different content
        // ...
        this.playRound()
    }

    playRound() {
        if (this.currentRound >= 3) {
            console.log("Game over")
            // TODO: implement the calculation of points 
            return
        }
        this.currentRound += 1
        // fetch 6 random cards
        // let the players play
        // finally, at the end
        this.progressingDawn()
    }

    progressingDawn() {
        // makes the boards "smaller" 
    }


}
