import Graph from 'graphology';
import CelestialBody from './CelestialBody.js'
import GridGraph from './GridGraph.js'

export default class Board extends GridGraph {

    constructor(numberOfRows = 11, numberOfCols = 10) {
        super(numberOfRows, numberOfCols)
        this.firstStar = null
    }

    // eventually, we will pass the encoded board (e.g. as a string) to this
    // to allow different variations of the board 
    setUpBoard(gapsAndPlanets = []) {
        super.setUpGrid(gapsAndPlanets)
        // three planets (remove later)
        this.tiles[3][6].type = 'planet'
        this.tiles[7][2].type = 'planet'
        this.tiles[9][8].type = 'planet'
    }

    setUpGraph(cardContent) {
        super.setUpGraph(cardContent)
    }

    handleCellClick(rowIndex, colIndex) {
        let secondStar = this.getTile(rowIndex, colIndex)
        if (secondStar.type === 'planet') {
            alert('You cannot connect a planet')
            return
        }
        if (this.firstStar === null) {
            this.firstStar = this.getTile(rowIndex, colIndex)
            this.firstStar.selected = true
        } else if (this.firstStar.isNeighborOf(secondStar)) {
            try {
                this.stateGraph.addEdge(this.fromTupleToId(this.firstStar.row, this.firstStar.col), this.fromTupleToId(rowIndex, colIndex))
            } catch (error) {
                alert('You cannot connect the same stars twice. Choose another pair of stars.')
            }
            this.firstStar.selected = false
            this.firstStar = null
        } else {
            alert('You can only connect neighboring stars.')
        }
    }

}