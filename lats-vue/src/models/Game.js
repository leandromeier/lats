import Board from './Board.js'

export default class Game {


    constructor(numberOfPlayers = 1) {
        // eventually, the game will have several boards
        this.boards = new Array(numberOfPlayers).fill(null).map(() => new Board())
        this.setUpGame()
    }

    setUpGame() {
        // set up the board(s)
        this.boards.forEach(board => board.setUpBoard())
    }


}
