import Graph from 'graphology';
import CelestialBody from './CelestialBody.js'
export default class Board {

    constructor(numberOfRows = 11, numberOfCols = 10) {
        this.padding = 4
        this.tileWidth = 5
        this.tileHeight = 5
        this.numberOfRows = numberOfRows
        this.numberOfCols = numberOfCols
        this.stateGraph = new Graph()
        this.firstStar = null
    }

    // eventually, we will pass the encoded board (e.g. as a string) to this
    // to allow different variations of the board 
    setUpBoard() {
        this.tiles = new Array(this.numberOfRows).fill(null).map(() =>
            new Array(this.numberOfCols).fill(null).map(() => new CelestialBody('star', this))
        )
        for (let row = 0; row < this.numberOfRows; row++) {
            for (let col = 0; col < this.numberOfCols; col++) {
                this.tiles[row][col].row = row
                this.tiles[row][col].col = col
            }
        }
        // three planets 
        this.tiles[3][6].type = 'planet'
        this.tiles[7][2].type = 'planet'
        this.tiles[9][8].type = 'planet'
        this.setUpGraph()
    }

    setUpGraph() {
        for (let i = 0; i < this.numberOfRows; i++) {
            for (let j = 0; j < this.numberOfCols; j++) {
                if (this.tiles[i][j].type === 'star') {
                    this.stateGraph.addNode(this.fromTupleToId(i, j))
                }
            }
        }
        // the board starts with two lines between stars
        this.stateGraph.addEdge(this.fromTupleToId(0, 0), this.fromTupleToId(0, 1))
        this.stateGraph.addEdge(this.fromTupleToId(1, 1), this.fromTupleToId(1, 2))

    }

    handleCellClick(rowIndex, colIndex) {
        // todo:
        // no double lines
        // only neighbors
        let secondStar = this.getTile(rowIndex, colIndex)
        if (this.firstStar === null) {
            this.firstStar = this.getTile(rowIndex, colIndex)
            this.firstStar.selected = true
        } else if (this.firstStar.isNeighborOf(secondStar)) {
            this.stateGraph.addEdge(this.fromTupleToId(this.firstStar.row, this.firstStar.col), this.fromTupleToId(rowIndex, colIndex))
            this.firstStar.selected = false
            this.firstStar = null
        } else {
            alert('You can only connect neighboring stars.')
        }
    }

    edgeToLine(edge) {
        const x1 = this.fromIdToTuple(this.stateGraph.source(edge))[1]
        const y1 = this.fromIdToTuple(this.stateGraph.source(edge))[0]
        const x2 = this.fromIdToTuple(this.stateGraph.target(edge))[1]
        const y2 = this.fromIdToTuple(this.stateGraph.target(edge))[0]
        return { y1: y1, x1: x1, y2: y2, x2: x2 }
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

    fromTupleToId = (r, c) => `(${r}:${c})`
    fromIdToTuple(id) {
        return id.slice(1, -1).split(':').map(Number)
    }
}