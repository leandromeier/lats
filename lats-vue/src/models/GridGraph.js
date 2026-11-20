import Graph from 'graphology';
import CelestialBody from './CelestialBody.js'
export default class GridGraph {

    constructor(numberOfRows, numberOfCols) {
        this.padding = 4
        this.tileWidth = 5
        this.tileHeight = 5
        this.numberOfRows = numberOfRows
        this.numberOfCols = numberOfCols
        this.stateGraph = new Graph({ type: 'undirected' })
    }

    // eventually, we will pass the encoded board (e.g. as a string) to this
    // to allow different variations of the board 

    /* Fills the grid with celestial bodies, according to the provided gaps and planets 
        each celestial body remembers its position in the grid.
        Parameters:
            gapsAndPlanets: An array of objects representing the gaps (no star) and planets on the board. */
    setUpGrid(gapsAndPlanets = []) {
        this.tiles = new Array(this.numberOfRows).fill(null).map(() =>
            new Array(this.numberOfCols).fill(null).map(() => new CelestialBody('star', this))
        )
        for (let row = 0; row < this.numberOfRows; row++) {
            for (let col = 0; col < this.numberOfCols; col++) {
                this.tiles[row][col].row = row
                this.tiles[row][col].col = col
            }
        }
    }

    /* Set up the graph underlying, in order to track edges and easily evaluate 
    in the end. The graph is initialized with nodes for each tile in the grid 
    and certain edges based on the card content. 
    parameters:
        cardContent: An array of strings representing the edges to be added to the graph. 
        Each edge is represented as a string in the format "(row:col);(row:col)". */
    setUpGraph(cardContent) {
        for (let i = 0; i < this.numberOfRows; i++) {
            for (let j = 0; j < this.numberOfCols; j++) {
                this.stateGraph.addNode(this.fromTupleToId(i, j))
            }
        }
        cardContent.forEach((pair) => {
            const [start, end] = pair.split(';')
            this.stateGraph.addEdge(start, end)
        })
    }


    /* Converts an edge in the graph to a line representation with coordinates.
    * Parameters:
    *   edge: The edge of the graph to convert.
    * Returns:
    *   An object with the plane coordinates of the line.
    */
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

    /* The graph's nodes are represented as strings in the format "(row:column)". 
    These two methods convert between that string representation and a tuple of numbers. */
    fromTupleToId = (r, c) => `(${r}:${c})`
    fromIdToTuple(id) {
        return id.slice(1, -1).split(':').map(Number)
    }
}