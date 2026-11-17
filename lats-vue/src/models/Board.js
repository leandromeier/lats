export default class Board {

    constructor(numberOfRows = 11, numberOfCols = 10) {
        this.padding = 4
        this.tileWidth = 5
        this.tileHeight = 5
        this.numberOfRows = numberOfRows
        this.numberOfCols = numberOfCols
        this.setUpBoard()
    }
    getBoardHeight() {
        return this.numberOfRows * (this.tileHeight + this.padding)
    }

    getBoardWidth() {
        return this.numberOfCols * (this.tileWidth + this.padding)
    }

    getTile(row, column) {
        if (row < 0 || row >= this.tiles.length || column < 0 || column >= this.tiles[0].length) {
            return null
        } else {
            return this.tiles[row][column]
        }
    }

    setUpBoard() {
        this.tiles = new Array(this.numberOfRows).fill(null).map(() => new Array(this.numberOfCols).fill('star'))
        // three random planets for now
        for (let i = 0; i < 3; i++) {
            const randomRow = Math.floor(Math.random() * this.numberOfRows)
            const randomCol = Math.floor(Math.random() * this.numberOfCols)
            this.tiles[randomRow][randomCol] = 'planet'
        }
    }
}