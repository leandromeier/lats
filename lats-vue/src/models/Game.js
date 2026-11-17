import Board from './Board.js'
import Graph from 'graphology';

export default class Game {

    constructor() {
        this.board = new Board()
        this.stateGraph = new Graph()
        this.currentlySelectedStar = null
        this.setUpGame()
    }

    setUpGame() {
        // set up the graph with nodes for each star (planets cannot form part of constellations)
        for (let i = 0; i < this.board.numberOfRows; i++) {
            for (let j = 0; j < this.board.numberOfCols; j++) {
                if (this.board.tiles[i][j] === 'star') {
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
        console.log(`Cell clicked at row ${rowIndex}, col ${colIndex}`)
        if (this.currentlySelectedStar === null) {
            this.currentlySelectedStar = { row: rowIndex, col: colIndex }
        } else if (this.currentlySelectedStar.row === rowIndex && this.currentlySelectedStar.col === colIndex) {
            this.currentlySelectedStar = null
        } else {
            this.stateGraph.addEdge(this.fromTupleToId(this.currentlySelectedStar.row, this.currentlySelectedStar.col), this.fromTupleToId(rowIndex, colIndex))
            console.log(`Added a new edge: (${this.currentlySelectedStar.row},${this.currentlySelectedStar.col}) -> (${rowIndex},${colIndex})`)
            this.currentlySelectedStar = null
        }
    }

    edgeToLine(edge) {
        const x1 = this.fromIdToTuple(this.stateGraph.source(edge))[1]
        const y1 = this.fromIdToTuple(this.stateGraph.source(edge))[0]
        const x2 = this.fromIdToTuple(this.stateGraph.target(edge))[1]
        const y2 = this.fromIdToTuple(this.stateGraph.target(edge))[0]
        return { y1: y1, x1: x1, y2: y2, x2: x2 }
    }

    fromTupleToId = (r, c) => `(${r},${c})`
    fromIdToTuple(id) {
        return id.slice(1, -1).split(',').map(Number)
    }

}
